package com.squadmap.map.application.dto;

import com.squadmap.category.application.dto.CategoryInfo;
import com.squadmap.place.application.dto.PlaceSimpleInfo;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Getter
@RequiredArgsConstructor
public class CategorizedPlaces {

    private final CategoryInfo categoryInfo;
    private final List<PlaceSimpleInfo> Places;

}
