package com.squadmap.core.place.infrastructure;

import com.squadmap.core.map.domain.Map;
import com.squadmap.core.place.domain.Place;
import com.squadmap.core.place.domain.Position;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PlaceRepository extends JpaRepository<Place, Long> {

    @Query("select p from Place p join fetch p.category where p.map.id = :mapId")
    List<Place> findAllByMapId(@Param("mapId") Long mapId);

    boolean existsPlaceByPositionAndMap(Position position, Map map);

    @Query("select p from Place p join fetch p.map join fetch p.category where p.id = :placeId")
    Optional<Place> findPlaceFetchAllById(@Param("placeId") Long placeId);

    @Query("select p from Place p join fetch p.map where p.id = :placeId")
    Optional<Place> findPlaceFetchMapById(@Param("placeId") Long placeId);

    Integer countPlacesByMap(Map map);
}
