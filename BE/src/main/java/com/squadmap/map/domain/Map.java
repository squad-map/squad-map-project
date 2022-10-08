package com.squadmap.map.domain;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Objects;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
public class Map {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private boolean fullDisclosure;

    private Long memberId;

    public static Map of(String name, boolean fullDisclosure, Long memberId) {
        return new Map(null, name, fullDisclosure, memberId);
    }

    public void update(String updateName, boolean fullDisclosure) {
        this.name = updateName;
        this.fullDisclosure = fullDisclosure;
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
