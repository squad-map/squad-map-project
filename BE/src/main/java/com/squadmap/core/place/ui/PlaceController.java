package com.squadmap.core.place.ui;

import com.squadmap.common.auth.Login;
import com.squadmap.common.dto.CommonResponse;
import com.squadmap.common.dto.SuccessCode;
import com.squadmap.core.group.application.dto.AccessInfo;
import com.squadmap.core.place.ui.dto.PlaceRequest;
import com.squadmap.core.place.ui.dto.PlaceUpdateRequest;
import com.squadmap.core.place.application.PlaceService;
import com.squadmap.core.place.application.dto.PlaceDetailInfo;
import com.squadmap.core.place.ui.dto.PlaceResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/map/{mapId}")
public class PlaceController {

    private final PlaceService placeService;

    @PostMapping("/places")
    @ResponseStatus(HttpStatus.CREATED)
    public CommonResponse<PlaceResponse> create(@Login Long loginId, @PathVariable Long mapId, @RequestBody @Valid PlaceRequest placeRequest) {
        Long placeId = placeService.create(AccessInfo.of(loginId, mapId),
                placeRequest.getName(),
                placeRequest.getAddress(),
                placeRequest.getLatitude(),
                placeRequest.getLongitude(),
                placeRequest.getStory(),
                placeRequest.getDetailLink(),
                placeRequest.getCategoryId());

        return CommonResponse.success(SuccessCode.PLACE_CREATE, new PlaceResponse(placeId));
    }

    @PatchMapping("/places/{placeId}")
    public CommonResponse<PlaceDetailInfo> update(@Login Long loginId, @PathVariable Long mapId, @PathVariable Long placeId,
                                  @RequestBody @Valid PlaceUpdateRequest placeUpdateRequest) {
        return CommonResponse.success(SuccessCode.PLACE_UPDATE, placeService.update(
                AccessInfo.of(loginId, mapId),
                placeId,
                placeUpdateRequest.getCategoryId(),
                placeUpdateRequest.getStory()));
    }

    @GetMapping("/places/{placeId}")
    public CommonResponse<PlaceDetailInfo> readOne(@Login Long loginId, @PathVariable Long mapId, @PathVariable Long placeId) {

        return CommonResponse.success(SuccessCode.PLACE_READ,
                placeService.readOne(AccessInfo.of(loginId, mapId), placeId));
    }
}
