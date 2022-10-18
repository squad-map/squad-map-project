package com.squadmap.place.application.dto;

import com.squadmap.place.domain.Place;
import com.squadmap.place.domain.Position;
import com.squadmap.place.ui.dto.Point;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class PlaceSimpleInfo {

    private final Long placeId;
    private final String placeName;
    private final String address;
    private final Position position;

    public static PlaceSimpleInfo from(Place place) {
        return new PlaceSimpleInfo(place.getId(), place.getName(), "address", place.getPosition());
    }

}
