package com.squadmap.map.application;

import com.squadmap.map.application.dto.MapDetail;
import com.squadmap.map.application.dto.MapSimpleInfo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;


public interface MapService {

    Long create(String mapName, Boolean isPrivate, Long memberId);

    void update(Long memberId, Long mapId, String mapName, boolean fullDisclosure);

    Page<MapSimpleInfo> readPublic(Pageable pageable);

    MapDetail findOne(Long mapId, Long memberId);
}
