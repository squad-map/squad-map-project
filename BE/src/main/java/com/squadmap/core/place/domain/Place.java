package com.squadmap.core.place.domain;

import com.squadmap.core.category.domain.Category;
import com.squadmap.core.map.domain.Map;
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

    private String address;

    @Embedded
    private Position position;

    private String description;

    private String detailLink;

    @ManyToOne(fetch = FetchType.LAZY)
    private Map map;

    @ManyToOne(fetch = FetchType.LAZY)
    private Category category;

    private Long memberId;

    public static Place of(String name, String address, Position position, String description,
                           String detailLink, Map map, Category category, Long memberId) {
        return new Place(null, name, address, position, description, detailLink, map, category, memberId);
    }

    public boolean hasSameMapId(Long mapId) {
        return this.map.getId().equals(mapId);
    }

    public void changeCategory(Category category) {
        this.category = category;
    }

    public void editDescription(String description) {
        this.description = description;
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
