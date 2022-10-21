package com.squadmap.place.ui.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PlaceUpdateRequest {

    private Long placeId;
    private Long categoryId;
    private String description;
}
