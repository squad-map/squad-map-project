package com.squadmap.place.application;

import com.squadmap.category.domain.Category;
import com.squadmap.category.infrastructure.CategoryRepository;
import com.squadmap.comment.application.dto.CommentInfo;
import com.squadmap.comment.domain.Comment;
import com.squadmap.comment.infrastructure.CommentRepository;
import com.squadmap.common.SimpleSlice;
import com.squadmap.common.excetpion.ClientException;
import com.squadmap.common.excetpion.ErrorStatusCodeAndMessage;
import com.squadmap.group.application.GroupMemberService;
import com.squadmap.map.domain.Map;
import com.squadmap.map.infrastructure.MapRepository;
import com.squadmap.member.domain.Member;
import com.squadmap.member.infrastructure.MemberRepository;
import com.squadmap.place.application.dto.PlaceDetailInfo;
import com.squadmap.place.domain.Place;
import com.squadmap.place.domain.Position;
import com.squadmap.place.infrastructure.PlaceRepository;
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

    private final GroupMemberService groupMemberService;
    private final PlaceRepository placeRepository;
    private final MapRepository mapRepository;
    private final CategoryRepository categoryRepository;
    private final CommentRepository commentRepository;
    private final MemberRepository memberRepository;

    @Override
    @Transactional
    public Long create(String name, String address, Double latitude, Double longitude, String story, String detailLink, Long mapId,
                       Long categoryId, Long memberId) {

        Map map = mapRepository.findById(mapId)
                .orElseThrow(() -> new ClientException(ErrorStatusCodeAndMessage.NO_SUCH_MAP));

        groupMemberService.checkHasMaintainLevel(mapId, memberId);

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ClientException(ErrorStatusCodeAndMessage.NO_SUCH_CATEGORY));
        Position position = new Position(latitude, longitude);
        if (placeRepository.existsPlaceByPositionAndMap(position, map)) {
            throw new ClientException(ErrorStatusCodeAndMessage.ALREADY_REGISTERED_PLACE);
        }

        Place place = placeRepository.save(Place.of(name, address, position, story, detailLink, map, category, memberId));
        return place.getId();
    }


    @Override
    @Transactional
    public PlaceDetailInfo update(Long memberId, Long placeId, Long categoryId, String story) {
        Place place = placeRepository.findPlaceFetchAllById(placeId)
                .orElseThrow(() -> new ClientException(ErrorStatusCodeAndMessage.NO_SUCH_PLACE));

        groupMemberService.checkHasMaintainLevel(place.getMapId(), memberId);

        place.editDescription(story);
        if (!place.getCategory().hasSameId(categoryId)) {
            Category category = categoryRepository.findByIdAndMapId(categoryId, place.getMap().getId())
                    .orElseThrow(() -> new ClientException(ErrorStatusCodeAndMessage.NO_SUCH_CATEGORY));
            place.changeCategory(category);
        }

        return PlaceDetailInfo.from(place);
    }

    @Override
    public PlaceDetailInfo readOne(Long memberId, Long placeId) {
        Place place = placeRepository.findPlaceFetchAllById(placeId)
                .orElseThrow(() -> new ClientException(ErrorStatusCodeAndMessage.NO_SUCH_PLACE));

        if (!place.isFullDisclosure()) {
            groupMemberService.checkHasReadLevel(place.getMapId(), memberId);
        }

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
                    comment.getId(), comment.getContent());
        });

        return PlaceDetailInfo.of(place, new SimpleSlice<>(commentInfos));
    }


}
