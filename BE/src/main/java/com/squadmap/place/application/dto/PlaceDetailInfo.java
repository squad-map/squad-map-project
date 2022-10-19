package com.squadmap.place.application.dto;

import com.squadmap.category.application.dto.CategoryInfo;
import com.squadmap.place.domain.Place;
import com.squadmap.place.domain.Position;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class PlaceDetailInfo {

    private final Long placeId;
    private final String placeName;
    private final String address;
    private final Double latitude;
    private final Double longitude;
    private final String description;
    private final Long categoryId;

    public static PlaceDetailInfo from(final Place place) {
        return new PlaceDetailInfo(
                place.getId(),
                place.getName(),
                place.getAddress(),
                place.getPosition().getLatitude(),
                place.getPosition().getLongitude(),
                place.getDescription(),
                place.getCategory().getId());
    }
}
