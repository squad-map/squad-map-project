package com.squadmap.map.application;

import com.squadmap.map.application.dto.MapDetail;
import com.squadmap.map.application.dto.MapSimpleInfo;
import com.squadmap.map.application.dto.MapsResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


public interface MapService {

    Long create(String mapName, String emoji, Boolean isPrivate, Long memberId);

    void update(Long memberId, Long mapId, String mapName, String emoji, boolean fullDisclosure);

    Page<MapSimpleInfo> readPublic(Pageable pageable);

    MapDetail findOne(Long mapId, Long memberId);

    MapsResponse readGroupMap(Long memberId);
}
