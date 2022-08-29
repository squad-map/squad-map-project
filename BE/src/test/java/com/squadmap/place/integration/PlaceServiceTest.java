package com.squadmap.place.integration;

import com.squadmap.place.application.PlaceService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.geo.Point;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
class PlaceServiceTest {

    @Autowired
    private PlaceService placeService;

    @Test
    void createTest() {
        //given
        String placeName = "my favorite place";
        double x = 37.123513;
        double y = 127.123414123;
        String description = "it's my favorite place\nthank you";
        Long mapId = 1L;
        Long categoryId = 1L;
        Point position = new Point(x, y);

        //when
        Long placeId = placeService.create(placeName, position, description, mapId, categoryId);

        //then
        assertThat(placeId).isEqualTo(2L);
    }
}
