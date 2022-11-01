package com.squadmap.place.application.dto;

import com.squadmap.place.domain.Place;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class PlaceSimpleInfo {

    private final Long placeId;
    private final String placeName;
    private final String address;
    private final Double latitude;
    private final Double longitude;

    public static PlaceSimpleInfo from(final Place place) {
        return new PlaceSimpleInfo(place.getId(),
                place.getName(),
                place.getAddress(),
                place.getPosition().getLatitude(),
                place.getPosition().getLongitude()
        );

    }

}
