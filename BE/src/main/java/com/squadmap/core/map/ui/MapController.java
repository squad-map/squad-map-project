package com.squadmap.core.map.ui;

import com.squadmap.common.SimplePage;
import com.squadmap.common.auth.Login;
import com.squadmap.core.map.application.MapService;
import com.squadmap.core.map.application.dto.MapDetail;
import com.squadmap.core.map.application.dto.MapSimpleInfo;
import com.squadmap.core.map.application.dto.MapsResponse;
import com.squadmap.core.map.ui.dto.MapCreateResponse;
import com.squadmap.core.map.ui.dto.MapRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class MapController {

    private final MapService mapService;

    @PostMapping("/map")
    @ResponseStatus(HttpStatus.CREATED)
    public MapCreateResponse createMap(@Login Long memberId, @RequestBody @Valid MapRequest mapCreateRequest) {

        Long mapId = mapService.create(mapCreateRequest.getMapName(), mapCreateRequest.getMapEmoji(), mapCreateRequest.getFullDisclosure(), memberId);

        return new MapCreateResponse(mapId);
    }

    @PutMapping("/map/{mapId}")
    public void updateMap(@Login Long memberId, @PathVariable Long mapId, @RequestBody @Valid MapRequest mapRequest) {
        mapService.update(memberId, mapId, mapRequest.getMapName(), mapRequest.getMapEmoji(), mapRequest.getFullDisclosure());
    }

    @GetMapping("/map/public")
    public SimplePage<MapSimpleInfo> findPublicMapList(@PageableDefault Pageable pageable, Optional<String> name) {
        return new SimplePage<>(mapService.searchPublic(pageable, name));
    }

    @GetMapping("/map/{mapId}")
    public MapDetail findMapOne(@PathVariable Long mapId, @Login Long memberId) {
        return mapService.findOne(mapId, memberId);
    }

    @GetMapping("/map/group")
    public MapsResponse findGroupMapList(@Login Long memberId, Optional<String> name) {
        return mapService.searchGroup(memberId, name);
    }


}
