package com.squadmap.place.integration;

import com.squadmap.place.application.PlaceService;
import com.squadmap.place.application.dto.PlaceDetailInfo;
import com.squadmap.place.ui.dto.Point;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
class PlaceServiceTest {

    @Autowired
    private PlaceService placeService;

    @Test
    @DisplayName("로그인된 유저이고, 지도에 권한에 있다면 중복되지 않은 장소라면 장소를 등록할 수 있다.")
    void placeCreateTest() {
        String name = "로니네 sweet home";
        String address = "서울시 관악구";
        Point position = new Point(127.01, 37.00);
        String description = "home sweet home";
        Long mapId = 1L;
        Long categoryId = 1L;
        Long memberId = 1L;

        Long placeId = placeService.create(name, address, position, description, mapId, categoryId, memberId);

        assertThat(placeId).isPositive();
    }

    @Test
    @DisplayName("로그인된 유저이고, 지도에 권한에 있다면 중복되지 않은 장소라면 장소를 등록할 수 있다.")
    void placeCreateTest_duplicate_place() {
        String name = "로니네 sweet home";
        String address = "서울시 관악구";
        Point position = new Point(127.00, 37.00);
        String description = "home sweet home";
        Long mapId = 1L;
        Long categoryId = 1L;
        Long memberId = 1L;

        Assertions.assertThatThrownBy(() -> placeService.create(name, address, position, description, mapId, categoryId, memberId))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("이미 등록된 장소입니다.");

    }

    @Test
    @DisplayName("로그인된 유저이고, 지도에 권한에 있다면 장소를 수정할 수 있다.")
    void placeUpdateTest() {
        String description = "remodeled my home";
        Long categoryId = 1L;
        Long memberId = 1L;
        Long placeId = 1L;

        PlaceDetailInfo placeDetailInfo = placeService.update(memberId, categoryId, placeId, description);

        assertThat(placeDetailInfo.getPlaceId()).isEqualTo(placeId);
        assertThat(placeDetailInfo.getCategoryId()).isEqualTo(categoryId);
        assertThat(placeDetailInfo.getDescription()).isEqualTo(description);

    }
}
