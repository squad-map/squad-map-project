package com.squadmap.core.place.ui;

import com.squadmap.common.auth.Login;
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
    public PlaceResponse create(@Login Long loginId, @RequestBody @Valid PlaceRequest placeRequest) {
        Long placeId = placeService.create(AccessInfo.of(loginId, placeRequest.getMapId()),
                placeRequest.getName(),
                placeRequest.getAddress(),
                placeRequest.getLatitude(),
                placeRequest.getLongitude(),
                placeRequest.getStory(),
                placeRequest.getDetailLink(),
                placeRequest.getCategoryId());
        return new PlaceResponse(placeId);
    }

    @PatchMapping("/places/{placeId}")
    public PlaceDetailInfo update(@Login Long loginId, @PathVariable Long mapId, @PathVariable Long placeId,
                                  @RequestBody @Valid PlaceUpdateRequest placeUpdateRequest) {
        return placeService.update(
                AccessInfo.of(loginId, mapId),
                placeId,
                placeUpdateRequest.getCategoryId(),
                placeUpdateRequest.getStory()
        );
    }

    @GetMapping("/places/{placeId}")
    public PlaceDetailInfo readOne(@Login Long loginId, @PathVariable Long mapId, @PathVariable Long placeId) {

        return placeService.readOne(AccessInfo.of(loginId, mapId), placeId);
    }
}
