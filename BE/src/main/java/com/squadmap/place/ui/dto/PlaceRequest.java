package com.squadmap.place.ui.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.geo.Point;


@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PlaceRequest {

    private String name;
    private Point position;
    private String description;
    private Long mapId;
    private Long categoryId;

}
