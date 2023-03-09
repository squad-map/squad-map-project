package com.squadmap.core.place.application.dto;

import com.squadmap.core.place.domain.Place;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class PlaceSimpleInfo {

    private final Long placeId;
    private final String placeName;
    private final String placeStory;
    private final String address;
    private final Double latitude;
    private final Double longitude;

    public static PlaceSimpleInfo from(final Place place) {
        return new PlaceSimpleInfo(place.getId(),
                place.getName(),
                place.getDescription(),
                place.getAddress(),
                place.getPosition().getLatitude(),
                place.getPosition().getLongitude()
        );

    }

}
