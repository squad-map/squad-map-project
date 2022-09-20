package com.squadmap.place.domain;

import lombok.*;
import org.springframework.data.geo.Point;

import javax.persistence.Embeddable;

@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@EqualsAndHashCode
public class Position {

    private Double latitude;
    private Double Longitude;

    public static Position from(Point point) {
        return new Position(point.getX(), point.getY());
    }
}
