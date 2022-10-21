package com.squadmap.map.domain;

import com.squadmap.place.domain.Place;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Map {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String emoji;

    private boolean fullDisclosure;

    private Long memberId;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "map")
    private List<Place> places = new ArrayList<>();

    private Map(String name, String emoji, boolean fullDisclosure, Long memberId) {
        this.name = name;
        this.emoji = emoji;
        this.fullDisclosure = fullDisclosure;
        this.memberId = memberId;
    }

    public static Map of(String name, String emoji, boolean fullDisclosure, Long memberId) {
        return new Map(name, emoji, fullDisclosure, memberId);
    }

    public void update(String updateName, String emoji, boolean fullDisclosure) {
        this.name = updateName;
        this.emoji = emoji;
        this.fullDisclosure = fullDisclosure;
    }

    public int getPlacesCount() {
        return this.places.size();
    }

    public boolean canAccess(Long memberId) {
        return this.memberId.equals(memberId);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Map map = (Map) o;
        return id.equals(map.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }


}
