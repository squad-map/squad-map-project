package com.squadmap.place.application;

import com.squadmap.category.domain.Category;
import com.squadmap.category.infrastructure.CategoryRepository;
import com.squadmap.map.domain.Map;
import com.squadmap.map.infrastructure.MapRepository;
import com.squadmap.place.application.dto.PlaceDetailInfo;
import com.squadmap.place.domain.Place;
import com.squadmap.place.domain.Position;
import com.squadmap.place.infrastructure.PlaceRepository;
import com.squadmap.place.ui.dto.Point;
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

    @Override
    @Transactional
    public Long create(String name, String address, Point position, String description, Long mapId, Long categoryId, Long memberId) {

        Map map = mapRepository.findById(mapId)
                .orElseThrow(NoSuchElementException::new);
        if (!map.canAccess(memberId)) {
            throw new IllegalArgumentException();
        }

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(NoSuchElementException::new);

        Position pos = Position.from(position);
        if (placeRepository.existsPlaceByPositionAndMap(pos, map)) {
            throw new IllegalArgumentException("이미 등록된 장소입니다.");
        }

        Place place = placeRepository.save(Place.of(name, address, pos, description, map, category, memberId));
        return place.getId();
    }

    @Override
    @Transactional
    public PlaceDetailInfo update(Long memberId, Long categoryId, Long placeId, String description) {
        Place place = placeRepository.findPlaceById(placeId)
                .orElseThrow(NoSuchElementException::new);

        if(!place.getMap().canAccess(memberId)) {
            throw new IllegalArgumentException();
        }
        place.editDescription(description);
        if(!place.getCategory().hasSameId(categoryId)) {
            Category category = categoryRepository.findById(categoryId)
                    .orElseThrow(NoSuchElementException::new);
            place.changeCategory(category);
        }

        return PlaceDetailInfo.of(place, categoryId);
    }


}
