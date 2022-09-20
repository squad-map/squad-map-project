package com.squadmap.place.ui;

import com.squadmap.place.ui.dto.PlaceRequest;
import com.squadmap.place.ui.dto.PlaceResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PlaceController {


    @PostMapping("/places")
    @ResponseStatus(HttpStatus.CREATED)
    public PlaceResponse create(@RequestBody PlaceRequest placeRequest) {

        return new PlaceResponse(1L);
    }
}
