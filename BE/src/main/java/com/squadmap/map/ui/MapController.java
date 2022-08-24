package com.squadmap.map.ui;

import com.squadmap.map.application.MapService;
import com.squadmap.map.ui.dto.MapCreateRequest;
import com.squadmap.map.ui.dto.MapCreateResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MapController {

    private final MapService mapService;

    @PostMapping("/map")
    @ResponseStatus(HttpStatus.CREATED)
    public MapCreateResponse createMap(@RequestBody MapCreateRequest mapCreateRequest) {
        // mock ID
        Long memberId = 1L;
        Long mapId = mapService.create(mapCreateRequest.getMapName(), mapCreateRequest.getIsPrivate(), memberId);

        return new MapCreateResponse(mapId);
    }
}
