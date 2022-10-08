package com.squadmap.map.ui;

import com.squadmap.common.auth.Login;
import com.squadmap.map.application.MapService;
import com.squadmap.map.ui.dto.MapCreateResponse;
import com.squadmap.map.ui.dto.MapRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

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
}
