package com.squadmap.place.ui.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PlaceRequest {

    private String name;
    private String address;
    private Point position;
    private String description;
    private Long mapId;
    private Long categoryId;
    private String categoryName;
    private String categoryColor;

}
