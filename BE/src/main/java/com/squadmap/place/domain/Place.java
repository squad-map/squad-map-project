package com.squadmap.place.domain;

import com.squadmap.category.domain.Category;
import com.squadmap.map.domain.Map;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Objects;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
public class Place {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Embedded
    private Position position;

    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    private Map map;

    @ManyToOne(fetch = FetchType.LAZY)
    private Category category;

    private Long memberId;

    public static Place of(String name, Position position, String description, Map map, Category category, Long memberId) {
        return new Place(null, name, position, description, map, category, memberId);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Place place = (Place) o;
        return id.equals(place.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
