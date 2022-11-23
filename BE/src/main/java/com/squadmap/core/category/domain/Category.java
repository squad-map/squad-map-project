package com.squadmap.core.category.domain;

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
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String color;

    @ManyToOne(fetch = FetchType.LAZY)
    private Map map;

    public static Category of(String name, String color, Map map) {
        return new Category(null, name, color, map);
    }

    public boolean hasSameId(Long categoryId) {
        return this.id.equals(categoryId);
    }

    public void update(String name, String color) {
        this.name = name;
        this.color = color;
    }

    public Long getMapId() {
        return this.getMap().getId();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Category category = (Category) o;
        return id.equals(category.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
