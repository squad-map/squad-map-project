package com.squadmap.core.place.application;

import com.squadmap.common.dto.SimpleSlice;
import com.squadmap.common.excetpion.ClientException;
import com.squadmap.common.excetpion.ErrorStatusCodeAndMessage;
import com.squadmap.core.access.RequiredPermission;
import com.squadmap.core.category.domain.Category;
import com.squadmap.core.category.infrastructure.CategoryRepository;
import com.squadmap.core.comment.application.dto.CommentInfo;
import com.squadmap.core.comment.domain.Comment;
import com.squadmap.core.comment.infrastructure.CommentRepository;
import com.squadmap.core.group.application.dto.AccessInfo;
import com.squadmap.core.group.domain.PermissionLevel;
import com.squadmap.core.map.domain.Map;
import com.squadmap.core.map.infrastructure.MapRepository;
import com.squadmap.core.place.application.dto.PlaceDetailInfo;
import com.squadmap.core.place.domain.Place;
import com.squadmap.core.place.domain.Position;
import com.squadmap.core.place.infrastructure.PlaceRepository;
import com.squadmap.member.domain.Member;
import com.squadmap.member.infrastructure.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PlaceServiceImpl implements PlaceService {

    private final PlaceRepository placeRepository;
    private final MapRepository mapRepository;
    private final CategoryRepository categoryRepository;
    private final CommentRepository commentRepository;
    private final MemberRepository memberRepository;

    @Override
    @Transactional
    @RequiredPermission(level = PermissionLevel.MAINTAIN)
    public Long create(AccessInfo accessInfo, String name, String address,
                       Double latitude, Double longitude, String story,
                       String detailLink, Long categoryId) {

        Map map = mapRepository.findById(accessInfo.getMapId())
                .orElseThrow(() -> new ClientException(ErrorStatusCodeAndMessage.NO_SUCH_MAP));

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ClientException(ErrorStatusCodeAndMessage.NO_SUCH_CATEGORY));
        Position position = new Position(latitude, longitude);
        if (placeRepository.existsPlaceByPositionAndMap(position, map)) {
            throw new ClientException(ErrorStatusCodeAndMessage.ALREADY_REGISTERED_PLACE);
        }

        Place place = placeRepository.save(Place.of(name, address, position, story, detailLink, map, category, accessInfo.getLoginId()));
        return place.getId();
    }


    @Override
    @Transactional
    @RequiredPermission(level = PermissionLevel.MAINTAIN)
    public PlaceDetailInfo update(AccessInfo accessInfo, Long placeId, Long categoryId, String story) {
        Place place = placeRepository.findPlaceFetchAllById(placeId)
                .orElseThrow(() -> new ClientException(ErrorStatusCodeAndMessage.NO_SUCH_PLACE));

        checkPlaceInMap(place, accessInfo.getMapId());

        place.editDescription(story);
        if (!place.getCategory().hasSameId(categoryId)) {
            Category category = categoryRepository.findByIdAndMap(categoryId, place.getMap())
                    .orElseThrow(() -> new ClientException(ErrorStatusCodeAndMessage.NO_SUCH_CATEGORY));

            place.changeCategory(category);
        }

        return PlaceDetailInfo.from(place);
    }

    @Override
    @RequiredPermission(level = PermissionLevel.READ)
    public PlaceDetailInfo readOne(AccessInfo accessInfo, Long placeId) {
            Place place = placeRepository.findPlaceFetchAllById(placeId)
                    .orElseThrow(() -> new ClientException(ErrorStatusCodeAndMessage.NO_SUCH_PLACE));

        checkPlaceInMap(place, accessInfo.getMapId());

            Slice<Comment> comments = commentRepository.findCommentsByPlaceId(placeId, Pageable.ofSize(5));
            List<Long> writerIds = comments.getContent()
                    .stream()
                    .map(Comment::getMemberId)
                    .collect(Collectors.toUnmodifiableList());

            java.util.Map<Long, Member> memberMap = memberRepository.findAllById(writerIds)
                    .stream()
                    .collect(Collectors.toMap(Member::getId, Function.identity()));

            Slice<CommentInfo> commentInfos = comments.map(comment -> {
                Member writer = memberMap.get(comment.getMemberId());
                return new CommentInfo(writer.getId(), writer.getNickname(), writer.getProfileImage(),
                        comment.getId(), comment.getContent(), comment.getWrittenAt());
            });

            return PlaceDetailInfo.of(place, new SimpleSlice<>(commentInfos));
    }

    @Override
    @Transactional
    @RequiredPermission(level = PermissionLevel.MAINTAIN)
    public void delete(AccessInfo accessInfo, Long placeId) {
        commentRepository.deleteCommentByPlaceIdQuery(placeId);
        placeRepository.deleteById(placeId);

    }


    private void checkPlaceInMap(Place place, Long mapId) {
        if(!place.hasSameMapId(mapId)) {
            throw new ClientException(ErrorStatusCodeAndMessage.FORBIDDEN);
        }
    }

}
