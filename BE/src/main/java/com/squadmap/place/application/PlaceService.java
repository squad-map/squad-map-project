package com.squadmap.place.application;

import com.squadmap.place.application.dto.PlaceDetailInfo;
import com.squadmap.place.ui.dto.Point;

public interface PlaceService {

    Long create(String name, String address, Point position, String description,
                               Long mapId, Long categoryId, String categoryName, String categoryColor, Long memberId);

    PlaceDetailInfo update(Long memberId, Long placeId, Long categoryId, String description);

    PlaceDetailInfo readOne(Long memberId, Long placeId);
}
