package com.squadmap.place.application;

import com.squadmap.category.domain.Category;
import com.squadmap.category.infrastructure.CategoryRepository;
import com.squadmap.common.excetpion.ClientException;
import com.squadmap.common.excetpion.ErrorStatusCodeAndMessage;
import com.squadmap.group.domain.GroupMember;
import com.squadmap.group.domain.PermissionLevel;
import com.squadmap.group.infrastructure.GroupMemberRepository;
import com.squadmap.map.domain.Map;
import com.squadmap.map.infrastructure.MapRepository;
import com.squadmap.place.application.dto.PlaceDetailInfo;
import com.squadmap.place.domain.Place;
import com.squadmap.place.domain.Position;
import com.squadmap.place.infrastructure.PlaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PlaceServiceImpl implements PlaceService {

    private final PlaceRepository placeRepository;
    private final MapRepository mapRepository;
    private final CategoryRepository categoryRepository;
    private final GroupMemberRepository groupMemberRepository;

    @Override
    @Transactional
    public Long create(String name, String address, Double latitude, Double longitude, String story, String detailLink, Long mapId,
                       Long categoryId, Long memberId) {

        Map map = mapRepository.findById(mapId)
                .orElseThrow(() -> new ClientException(ErrorStatusCodeAndMessage.NO_SUCH_MAP));

        GroupMember groupMember = groupMemberRepository.findByMapIdAndMemberId(mapId, memberId)
                .orElseThrow(() -> new ClientException(ErrorStatusCodeAndMessage.NO_SUCH_GROUP_MEMBER));

        if(!groupMember.hasRequiredPermission(PermissionLevel.MAINTAIN)) {
            throw new ClientException(ErrorStatusCodeAndMessage.REQUIRE_MAINTAIN_PERMISSION);
        }

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

        GroupMember groupMember = groupMemberRepository.findByMapIdAndMemberId(place.getMapId(), memberId)
                .orElseThrow(() -> new ClientException(ErrorStatusCodeAndMessage.NO_SUCH_GROUP_MEMBER));

        if(!groupMember.hasRequiredPermission(PermissionLevel.MAINTAIN)) {
            throw new ClientException(ErrorStatusCodeAndMessage.REQUIRE_MAINTAIN_PERMISSION);
        }

        place.editDescription(story);
        if(!place.getCategory().hasSameId(categoryId)) {
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

        if(!groupMemberRepository.existsByMapIdAndMemberId(place.getMapId(), memberId)) {
            throw new ClientException(ErrorStatusCodeAndMessage.NO_SUCH_GROUP_MEMBER);
        };

        return PlaceDetailInfo.from(place);
    }


}
