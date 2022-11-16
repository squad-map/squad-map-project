package com.squadmap.place.integration;

import com.squadmap.IntegrationTest;
import com.squadmap.common.excetpion.ClientException;
import com.squadmap.place.application.PlaceService;
import com.squadmap.place.application.dto.PlaceDetailInfo;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.assertj.core.api.Assertions.assertThat;

@IntegrationTest
class PlaceServiceTest  {

    @Autowired
    private PlaceService placeService;

    @Test
    @DisplayName("로그인된 유저이고, 지도에 대한 권한이 있고, 중복되지 않은 장소라면 장소를 등록할 수 있다.")
    void placeCreateTest() {
        String name = "로니네 sweet home";
        String address = "서울시 관악구";
        Double latitude = 127.01;
        Double longitude = 36.00;
        String description = "home sweet home";
        String detailLink = "place link";
        Long mapId = 1L;
        Long categoryId = 1L;
        Long memberId = 1L;

        Long placeId = placeService.create(name, address, latitude, longitude, description, detailLink,
                mapId, categoryId, memberId);

        assertThat(placeId).isPositive();
    }

    @Test
    @DisplayName("같은 지도에 중복된 장소를 등록하면 ClientException을 던진다. ")
    void placeCreateTest_duplicate_place() {
        String name = "로니네 sweet home";
        String address = "서울시 관악구";
        Double latitude = 127.00;
        Double longitude = 37.00;
        String description = "home sweet home";
        String detailLink = "place link";
        Long mapId = 1L;
        Long categoryId = 1L;
        Long memberId = 1L;

        Assertions.assertThatThrownBy(() -> placeService.create(name, address, latitude, longitude,
                        description, detailLink, mapId, categoryId, memberId))
                .isInstanceOf(ClientException.class)
                .hasMessage("지도 내에 이미 등록되어 있습니다.");

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
        assertThat(placeDetailInfo.getStory()).isEqualTo(description);

    }

    @Test
    @DisplayName("로그인된 유저이고, 지도에 권한에 있다면 장소를 조회할 수 있다.")
    void placeReadOneTest() {

        Long memberId = 1L;
        Long placeId = 1L;
        PlaceDetailInfo placeDetailInfo = placeService.readOne(memberId, placeId);

        assertThat(placeDetailInfo.getPlaceId()).isEqualTo(placeId);

    }
}
