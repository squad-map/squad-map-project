package com.squadmap.map.ui;

import com.squadmap.common.SimplePage;
import com.squadmap.common.auth.Login;
import com.squadmap.map.application.MapService;
import com.squadmap.map.application.dto.MapDetail;
import com.squadmap.map.application.dto.MapSimpleInfo;
import com.squadmap.map.application.dto.MapsResponse;
import com.squadmap.map.ui.dto.MapCondition;
import com.squadmap.map.ui.dto.MapCreateResponse;
import com.squadmap.map.ui.dto.MapRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class MapController {

    private final MapService mapService;

    @PostMapping("/map")
    @ResponseStatus(HttpStatus.CREATED)
    public MapCreateResponse createMap(@Login Long memberId, @RequestBody MapRequest mapCreateRequest) {

        Long mapId = mapService.create(mapCreateRequest.getMapName(), mapCreateRequest.getMapEmoji(), mapCreateRequest.getFullDisclosure(), memberId);

        return new MapCreateResponse(mapId);
    }

    @PostMapping("/map/{mapId}")
    public void updateMap(@Login Long memberId, @PathVariable Long mapId, @RequestBody MapRequest mapRequest) {
        mapService.update(memberId, mapId, mapRequest.getMapName(), mapRequest.getMapEmoji(), mapRequest.getFullDisclosure());
    }

    @GetMapping("/map/public")
    public SimplePage<MapSimpleInfo> findPublicMapList(@PageableDefault Pageable pageable) {
        return new SimplePage<>(mapService.readPublic(pageable));
    }

    @GetMapping("/map/{mapId}")
    public MapDetail findMapOne(@PathVariable Long mapId, @Login Long memberId) {
        return mapService.findOne(mapId, memberId);
    }

    @GetMapping("/map/group")
    public MapsResponse findGroupMapList(@Login Long memberId) {
        return mapService.readGroupMap(memberId);
    }

    @GetMapping("/map")
    public MapsResponse searchGroupMapWithName(@Login Long memberId, MapCondition mapCondition, String searchName) {
        if (mapCondition.equals(MapCondition.PUBLIC)) {
            return mapService.searchPublicMapName(searchName);
        }
        return mapService.searchGroupMapName(searchName, memberId);
    }


}
