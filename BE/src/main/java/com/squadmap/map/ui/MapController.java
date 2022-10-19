package com.squadmap.map.ui;

import com.squadmap.common.SimplePage;
import com.squadmap.common.auth.Login;
import com.squadmap.map.application.MapService;
import com.squadmap.map.application.dto.MapDetail;
import com.squadmap.map.application.dto.MapSimpleInfo;
import com.squadmap.map.application.dto.MapsResponse;
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
@Transactional(readOnly = true)
public class MapController {

    private final MapService mapService;

    @PostMapping("/map")
    @ResponseStatus(HttpStatus.CREATED)
    @Transactional
    public MapCreateResponse createMap(@Login Long memberId, @RequestBody MapRequest mapCreateRequest) {

        Long mapId = mapService.create(mapCreateRequest.getMapName(), mapCreateRequest.getFullDisclosure(), memberId);

        return new MapCreateResponse(mapId);
    }

    @PostMapping("/map/{mapId}")
    @Transactional
    public void updateMap(@Login Long memberId, @PathVariable Long mapId, @RequestBody MapRequest mapRequest) {
        mapService.update(memberId, mapId, mapRequest.getMapName(), mapRequest.getFullDisclosure());
    }

    @GetMapping("/map/public")
    public SimplePage<MapSimpleInfo> searchPublicMapList(@PageableDefault Pageable pageable) {
        return new SimplePage<>(mapService.readPublic(pageable));
    }

    @GetMapping("/map/{mapId}")
    public MapDetail searchOneMap(@PathVariable Long mapId, @Login Long memberId) {
        return mapService.findOne(mapId, memberId);
    }

    @GetMapping("/map/group")
    public MapsResponse searchGroupMapList(@Login Long memberId) {
        return mapService.readGroupMap(memberId);
    }
}
