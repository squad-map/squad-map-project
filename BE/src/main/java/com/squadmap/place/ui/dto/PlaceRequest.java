package com.squadmap.place.ui.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor
public class PlaceRequest {

    private String name;
    private String address;
    private Double latitude;
    private Double longitude;
    private String story;
    private String detailLink;
    private Long mapId;
    private Long categoryId;

}
