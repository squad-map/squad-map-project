package com.squadmap.core.map.ui;

import com.squadmap.common.auth.Login;
import com.squadmap.common.dto.CommonResponse;
import com.squadmap.common.dto.SimpleSlice;
import com.squadmap.common.dto.SuccessCode;
import com.squadmap.core.group.application.dto.AccessInfo;
import com.squadmap.core.map.application.MapService;
import com.squadmap.core.map.application.dto.MapDetail;
import com.squadmap.core.map.application.dto.MapSimpleInfo;
import com.squadmap.core.map.application.dto.MapUpdateInfo;
import com.squadmap.core.map.application.dto.MapsResponse;
import com.squadmap.core.map.ui.dto.MapCreateResponse;
import com.squadmap.core.map.ui.dto.MapRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/map")
public class MapController {

    private final MapService mapService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CommonResponse<MapCreateResponse> createMap(@Login Long memberId, @RequestBody @Valid MapRequest mapCreateRequest) {

        Long mapId = mapService.create(mapCreateRequest.getMapName(), mapCreateRequest.getMapEmoji(), mapCreateRequest.isFullDisclosure(), memberId);

        return CommonResponse.success(SuccessCode.MAP_CREATE, new MapCreateResponse(mapId));
    }

    @PutMapping("/{mapId}")
    public CommonResponse<MapUpdateInfo> updateMap(@Login Long memberId, @PathVariable Long mapId, @RequestBody @Valid MapRequest mapRequest) {
        MapUpdateInfo mapUpdateInfo = mapService.update(memberId, mapId, mapRequest.getMapName(), mapRequest.getMapEmoji(), mapRequest.isFullDisclosure());

        return CommonResponse.success(SuccessCode.MAP_UPDATE, mapUpdateInfo);
    }

    @GetMapping("/public")
    public CommonResponse<SimpleSlice<MapSimpleInfo>> findPublicMapList(@RequestParam(defaultValue = "0") Long lastMapId, Optional<String> name) {

        return CommonResponse.success(SuccessCode.MAP_READ_PUB,
                mapService.searchPublic(lastMapId, name));
    }

    @GetMapping("/{mapId}")
    public CommonResponse<MapDetail> findMapOne(@PathVariable Long mapId, @Login Long loginId) {
        return CommonResponse.success(SuccessCode.MAP_READ_DETAIL,
                mapService.findOne(AccessInfo.of(loginId, mapId)));
    }

    @GetMapping("/group")
    public CommonResponse<SimpleSlice<MapSimpleInfo>> findGroupMapList(@Login Long memberId, @RequestParam(defaultValue = "0") Long lastMapId, Optional<String> name) {
        return CommonResponse.success(SuccessCode.MAP_READ_PRI,
                mapService.searchGroup(memberId, lastMapId, name));
    }

    @DeleteMapping("/{mapId}")
    public CommonResponse<Void> deleteMap(@Login Long memberId, @PathVariable Long mapId) {
        mapService.delete(AccessInfo.of(memberId, mapId));

        return CommonResponse.emptyData(SuccessCode.MAP_DELETE);
    }


}
