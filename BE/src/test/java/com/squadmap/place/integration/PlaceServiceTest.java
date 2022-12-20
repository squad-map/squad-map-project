package com.squadmap.place.integration;

import com.squadmap.IntegrationTest;
import com.squadmap.common.excetpion.ClientException;
import com.squadmap.common.excetpion.ErrorStatusCodeAndMessage;
import com.squadmap.core.group.application.dto.AccessInfo;
import com.squadmap.core.place.application.PlaceService;
import com.squadmap.core.place.application.dto.PlaceDetailInfo;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.InstanceOfAssertFactories.map;

@IntegrationTest
class PlaceServiceTest {

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

        Long placeId = placeService.create(AccessInfo.of(memberId, mapId), name, address,
                latitude, longitude, description, detailLink, categoryId);

        assertThat(placeId).isPositive();
    }

    @Test
    @DisplayName("같은 지도에 중복된 장소를 등록하면 ClientException 던진다.")
    void placeCreateTest_duplicate_place() {
        String name = "로니네 sweet home";
        String address = "서울시 관악구";
        Double latitude = 127.00;
        Double longitude = 37.000;
        String description = "home sweet home";
        String detailLink = "place link";
        Long mapId = 1L;
        Long categoryId = 1L;
        Long memberId = 1L;

        assertThatThrownBy(() -> placeService.create(AccessInfo.of(memberId, mapId), name, address,
                latitude, longitude, description, detailLink, categoryId))
                .isInstanceOf(ClientException.class)
                .hasMessage(ErrorStatusCodeAndMessage.ALREADY_REGISTERED_PLACE.getMessage());

    }


    @Test
    @DisplayName("로그인된 유저이고, 지도에 MAINTAIN 이상의 권한에 있다면 장소를 수정할 수 있다.")
    void placeUpdateTest() {
        String description = "remodeled my home";
        Long categoryId = 1L;
        Long mapId = 1L;
        Long memberId = 1L;
        Long placeId = 1L;

        PlaceDetailInfo placeDetailInfo = placeService.update(AccessInfo.of(memberId, mapId), categoryId, placeId, description);

        assertThat(placeDetailInfo.getPlaceId()).isEqualTo(placeId);
        assertThat(placeDetailInfo.getCategoryId()).isEqualTo(categoryId);
        assertThat(placeDetailInfo.getStory()).isEqualTo(description);

    }

    @Test
    @DisplayName("지도에 MAINTAIN 미만의 권한을 가진 사용자는 장소를 수정히면 Exception이 발생한다.")
    void placeUpdateTest_fail_READ_permission() {
        String description = "remodeled my home";
        Long categoryId = 1L;
        Long readMemberId = 3L;
        Long noPermissionMemberId = 5L;
        Long mapId = 2L;
        Long placeId = 1L;

        assertThatThrownBy(() -> placeService.update(AccessInfo.of(readMemberId, mapId), categoryId, placeId, description))
                .isInstanceOf(ClientException.class)
                .hasMessage(ErrorStatusCodeAndMessage.FORBIDDEN.getMessage());
        assertThatThrownBy(() -> placeService.update(AccessInfo.of(noPermissionMemberId, mapId), categoryId, placeId, description))
                .isInstanceOf(ClientException.class)
                .hasMessage(ErrorStatusCodeAndMessage.FORBIDDEN.getMessage());
    }

    @Test
    @DisplayName("로그인된 유저이고, 지도에 권한에 있다면 장소를 조회할 수 있다.")
    void placeReadOneTest() {

        Long memberId = 1L;
        Long placeId = 1L;
        Long mapId = 1L;

        PlaceDetailInfo placeDetailInfo = placeService.readOne(AccessInfo.of(memberId, mapId), placeId);

        assertThat(placeDetailInfo.getPlaceId()).isEqualTo(placeId);

    }

    @Test
    @DisplayName("권한이 없는 사용자여도 전체공개 지도의 장소이면 조회할 수 있다.")
    void placeReadOneTest_no_() {

        Long memberId = 4L;
        Long placeId = 1L;
        Long mapId = 1L;
        PlaceDetailInfo placeDetailInfo = placeService.readOne(AccessInfo.of(memberId, mapId), placeId);

        assertThat(placeDetailInfo.getPlaceId()).isEqualTo(placeId);

    }

    @Test
    @DisplayName("권한이 없는 사용자가 장소를 조회하면, Exception이 발생한다.")
    void placeReadOneTest_no_readPermissionLevel() {

        Long memberId = 5L;
        Long placeId = 2L;
        Long mapId = 2L;
        assertThatThrownBy(() -> placeService.readOne(AccessInfo.of(memberId, mapId), placeId))
                .isInstanceOf(ClientException.class)
                .hasMessage(ErrorStatusCodeAndMessage.FORBIDDEN.getMessage());

    }
}
