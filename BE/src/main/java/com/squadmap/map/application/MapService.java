package com.squadmap.map.application;

import com.squadmap.map.application.dto.MapDetail;
import com.squadmap.map.application.dto.MapSimpleInfo;
import com.squadmap.map.application.dto.MapsResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;
import java.util.OptionalInt;


public interface MapService {

    Long create(String mapName, String emoji, Boolean isPrivate, Long memberId);

    void update(Long memberId, Long mapId, String mapName, String emoji, boolean fullDisclosure);

    Page<MapSimpleInfo> searchPublic(Pageable pageable, Optional<String> name);

    MapDetail findOne(Long mapId, Long memberId);

    MapsResponse readGroupMap(Long memberId, Optional<String> name);

}
