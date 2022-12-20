package com.squadmap.core.place.application;

import com.squadmap.core.group.application.dto.AccessInfo;
import com.squadmap.core.place.application.dto.PlaceDetailInfo;

public interface PlaceService {

    Long create(AccessInfo accessInfo, String name, String address, Double latitude, Double longitude, String story, String detailLink,
                Long categoryId);

    PlaceDetailInfo update(AccessInfo accessInfo, Long placeId, Long categoryId, String story);

    PlaceDetailInfo readOne(AccessInfo accessInfo, Long placeId);
}
