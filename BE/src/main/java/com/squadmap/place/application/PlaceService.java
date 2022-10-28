package com.squadmap.place.application;

import com.squadmap.place.application.dto.PlaceDetailInfo;

public interface PlaceService {

    Long create(String name, String address, Double latitude, Double longitude, String story, String detailLink,
                               Long mapId, Long categoryId, Long memberId);

    PlaceDetailInfo update(Long memberId, Long placeId, Long categoryId, String story);

    PlaceDetailInfo readOne(Long memberId, Long placeId);
}
