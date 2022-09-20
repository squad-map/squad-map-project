package com.squadmap.place.application;

import org.springframework.data.geo.Point;

public interface PlaceService {

    Long create(String name, Point position, String description, Long mapId, Long categoryId);
}
