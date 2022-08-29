package com.squadmap.place.application;

import com.squadmap.category.domain.Category;
import com.squadmap.category.infrastructure.CategoryRepository;
import com.squadmap.map.domain.Map;
import com.squadmap.map.infrastructure.MapRepository;
import com.squadmap.place.domain.Place;
import com.squadmap.place.domain.Position;
import com.squadmap.place.infrastructure.PlaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.geo.Point;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PlaceServiceImpl implements PlaceService{

    private final PlaceRepository placeRepository;
    private final MapRepository mapRepository;
    private final CategoryRepository categoryRepository;

    @Override
    @Transactional
    public Long create(String name, Point position, String description, Long mapId, Long categoryId) {
        // mock member
        Long memberId = 1L;

        Map map = mapRepository.findById(mapId)
                .orElseThrow(NoSuchElementException::new);

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(NoSuchElementException::new);

        Place place = Place.of(name, Position.from(position), description, map, category, memberId);

        Place saved = placeRepository.save(place);

        return saved.getId();
    }
}
