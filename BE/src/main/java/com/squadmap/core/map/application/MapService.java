package com.squadmap.core.map.application;

import com.squadmap.common.dto.SimplePage;
import com.squadmap.common.dto.SimpleSlice;
import com.squadmap.core.group.application.dto.AccessInfo;
import com.squadmap.core.map.application.dto.MapDetail;
import com.squadmap.core.map.application.dto.MapSimpleInfo;
import com.squadmap.core.map.application.dto.MapUpdateInfo;
import com.squadmap.core.map.application.dto.MapsResponse;
import org.springframework.data.domain.Pageable;

import java.util.Optional;


public interface MapService {

    Long create(String mapName, String emoji, Boolean isPrivate, Long memberId);

    MapUpdateInfo update(Long memberId, Long mapId, String mapName, String emoji, boolean fullDisclosure);

    SimpleSlice<MapSimpleInfo> searchPublic(Long lastMapId, Optional<String> name);

    MapDetail findOne(AccessInfo accessInfo);

    MapsResponse searchGroup(Long memberId, Optional<String> name);

}
