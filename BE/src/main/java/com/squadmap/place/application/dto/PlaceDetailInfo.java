package com.squadmap.place.application.dto;

import com.squadmap.comment.application.dto.CommentInfo;
import com.squadmap.common.SimpleSlice;
import com.squadmap.place.domain.Place;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class PlaceDetailInfo {

    private final Long placeId;
    private final String name;
    private final String address;
    private final Double latitude;
    private final Double longitude;
    private final String story;
    private final String detailLink;
    private final Long categoryId;
    private final SimpleSlice<CommentInfo> comments;

    public static PlaceDetailInfo of(final Place place, final SimpleSlice<CommentInfo> comments) {
        return new PlaceDetailInfo(
                place.getId(),
                place.getName(),
                place.getAddress(),
                place.getPosition().getLatitude(),
                place.getPosition().getLongitude(),
                place.getDescription(),
                place.getDetailLink(),
                place.getCategory().getId(),
                comments
        );
    }

    public static PlaceDetailInfo from(final Place place) {
        return new PlaceDetailInfo(
                place.getId(),
                place.getName(),
                place.getAddress(),
                place.getPosition().getLatitude(),
                place.getPosition().getLongitude(),
                place.getDescription(),
                place.getDetailLink(),
                place.getCategory().getId(),
                null
        );
    }

}
