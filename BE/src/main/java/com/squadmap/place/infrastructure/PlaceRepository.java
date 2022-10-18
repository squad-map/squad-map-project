package com.squadmap.place.infrastructure;

import com.squadmap.place.domain.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PlaceRepository extends JpaRepository<Place, Long> {

    @Query("select p from Place p join fetch p.category where p.map = :mapId")
    List<Place> findAllByMapId(@Param("mapId") Long mapId);
}
