package com.squadmap.core.map.ui;

import com.squadmap.common.dto.CommonResponse;
import com.squadmap.common.dto.SimplePage;
import com.squadmap.common.auth.Login;
import com.squadmap.common.dto.SuccessCode;
import com.squadmap.core.map.application.MapService;
import com.squadmap.core.map.application.dto.MapDetail;
import com.squadmap.core.map.application.dto.MapSimpleInfo;
import com.squadmap.core.map.application.dto.MapUpdateInfo;
import com.squadmap.core.map.application.dto.MapsResponse;
import com.squadmap.core.map.ui.dto.MapCreateResponse;
import com.squadmap.core.map.ui.dto.MapRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
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
    public CommonResponse<SimplePage<MapSimpleInfo>> findPublicMapList(@PageableDefault Pageable pageable, Optional<String> name) {
        log.info("pageNumber = {}, size = {}", pageable.getPageNumber(), pageable.getPageSize());
        return CommonResponse.success(SuccessCode.MAP_READ_PUB,
                mapService.searchPublic(pageable, name));
    }

    @GetMapping("/{mapId}")
    public CommonResponse<MapDetail> findMapOne(@PathVariable Long mapId, @Login Long memberId) {
        return CommonResponse.success(SuccessCode.MAP_READ_DETAIL,
                mapService.findOne(mapId, memberId));
    }

    // 페이징 리팩토링시 API 합치는 거 고민해보기
    @GetMapping("/group")
    public CommonResponse<MapsResponse> findGroupMapList(@Login Long memberId, Optional<String> name) {
        return CommonResponse.success(SuccessCode.MAP_READ_PRI,
                mapService.searchGroup(memberId, name));
    }


}
