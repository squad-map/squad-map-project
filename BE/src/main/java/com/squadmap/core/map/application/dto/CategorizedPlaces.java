package com.squadmap.core.map.application.dto;

import com.squadmap.core.category.application.dto.CategoryInfo;
import com.squadmap.core.place.application.dto.PlaceSimpleInfo;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Getter
@RequiredArgsConstructor
public class CategorizedPlaces {

    private final CategoryInfo categoryInfo;
    private final List<PlaceSimpleInfo> Places;

}
