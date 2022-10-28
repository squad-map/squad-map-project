package com.squadmap.place.ui;

import com.squadmap.common.auth.Login;
import com.squadmap.place.application.PlaceService;
import com.squadmap.place.application.dto.PlaceDetailInfo;
import com.squadmap.place.ui.dto.PlaceRequest;
import com.squadmap.place.ui.dto.PlaceResponse;
import com.squadmap.place.ui.dto.PlaceUpdateRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class PlaceController {

    private final PlaceService placeService;

    @PostMapping("/places")
    @ResponseStatus(HttpStatus.CREATED)
    public PlaceResponse create(@Login Long memberId, @RequestBody PlaceRequest placeRequest) {
        Long placeId = placeService.create(placeRequest.getName(),
                placeRequest.getAddress(),
                placeRequest.getLatitude(),
                placeRequest.getLongitude(),
                placeRequest.getStories(),
                placeRequest.getDetailLink(),
                placeRequest.getMapId(),
                placeRequest.getCategoryId(),
                memberId);
        return new PlaceResponse(placeId);
    }

    @PatchMapping("/places/{placeId}")
    public PlaceDetailInfo update(@Login Long memberId, @PathVariable Long placeId, @RequestBody PlaceUpdateRequest placeUpdateRequest) {
         return placeService.update(
                memberId,
                placeId,
                placeUpdateRequest.getCategoryId(),
                placeUpdateRequest.getStory()
        );
    }

    @GetMapping("/places/{placeId}")
    public PlaceDetailInfo readOne(@Login Long memberId, @PathVariable Long placeId) {

        return placeService.readOne(memberId, placeId);
    }
}
