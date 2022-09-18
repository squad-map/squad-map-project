package com.squadmap.map.ui;

import com.squadmap.common.auth.Login;
import com.squadmap.common.auth.application.dto.LoginMember;
import com.squadmap.map.application.MapService;
import com.squadmap.map.ui.dto.MapRequest;
import com.squadmap.map.ui.dto.MapCreateResponse;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.common.reflection.XMember;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class MapController {

    private final MapService mapService;

    @PostMapping("/map")
    @ResponseStatus(HttpStatus.CREATED)
    public MapCreateResponse createMap(@Login LoginMember loginMember, @RequestBody MapRequest mapCreateRequest) {

        Long mapId = mapService.create(mapCreateRequest.getMapName(), mapCreateRequest.getIsPrivate(), loginMember.getId());

        return new MapCreateResponse(mapId);
    }

    @PostMapping("/map/{mapId}")
    public void updateMap(@PathVariable Long mapId, @RequestBody MapRequest mapRequest) {
        Long memeberId = 1L;
        mapService.update(memeberId, mapId, mapRequest.getMapName(), mapRequest.getIsPrivate());
    }
}
