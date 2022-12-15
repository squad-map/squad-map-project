package com.squadmap.map.integration;

import com.squadmap.IntegrationTest;
import com.squadmap.common.SimplePage;
import com.squadmap.common.excetpion.ClientException;
import com.squadmap.common.excetpion.ErrorStatusCodeAndMessage;
import com.squadmap.core.map.application.MapService;
import com.squadmap.core.map.application.dto.MapDetail;
import com.squadmap.core.map.application.dto.MapSimpleInfo;
import com.squadmap.core.map.application.dto.MapsResponse;
import com.squadmap.core.map.domain.Map;
import com.squadmap.core.map.infrastructure.MapRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;

@IntegrationTest
class MapServiceTest  {

    @Autowired
    private MapService mapService;

    @Autowired
    private MapRepository mapRepository;

    @Test
    @DisplayName("map을 새롭게 생성할 수 있다.")
    void mapCreateTest() {

        //given
        Long memberId = 1L;
        String emoji = "U+1F600";
        String mapName = "first map";
        Boolean fullDisclosure = false;

        //when
        Long mapId = mapService.create(mapName, emoji, fullDisclosure, memberId);

        //then
        assertThat(mapId).isNotNull();
    }

    @Test
    @DisplayName("존재하는 지도라면, 지도를 업데이트할 수 있다.")
    void updateTest_not_host_fail() {
        Long memberId = 1L;
        String mapName = "changed map";
        String emoji = "U+1F600";
        boolean fullDisclosure = true;

        Map map = mapRepository.save(Map.of("my map", "U+1F603", false, memberId));

        mapService.update(memberId, map.getId(), mapName, emoji, fullDisclosure);

        Map changedMap = mapRepository.findById(map.getId())
                .orElseThrow(NoSuchElementException::new);

        assertThat(changedMap).isEqualTo(map);
        assertThat(changedMap.isFullDisclosure()).isTrue();
        assertThat(changedMap.getMemberId()).isEqualTo(memberId);
        assertThat(changedMap.getName()).isEqualTo(mapName);
        assertThat(changedMap.getEmoji()).isEqualTo(emoji);

    }

    @Test
    @DisplayName("지도의 주인이 아닌 사용자가 지도를 업데이트하려하면, 익셉션이 발생한다.")
    void updateTest() {
        Long memberId = 2L;
        Long mapId = 1L;
        String mapName = "changed map";
        String emoji = "U+1F600";
        boolean fullDisclosure = true;

        assertThatThrownBy(() -> mapService.update(memberId, mapId, mapName, emoji, fullDisclosure))
                .isInstanceOf(ClientException.class)
                .hasMessage(ErrorStatusCodeAndMessage.FORBIDDEN.getMessage());

    }

    @Test
    @DisplayName("전체 공개 지도는, 로그인하지 않은 유저도 조회할 수 있다.")
    void searchPublicMapList() {

        SimplePage<MapSimpleInfo> mapSimpleInfos = mapService.searchPublic(PageRequest.of(0, 5), Optional.empty());
        List<MapSimpleInfo> content = mapSimpleInfos.getContent();

        assertThat(content.get(0).getHostNickname()).isEqualTo("nickname");
        assertThat(content.get(0).getMapName()).isEqualTo("first map");
        assertThat(content.get(0).getPlacesCount()).isPositive();
        assertThat(mapSimpleInfos.getTotalElements()).isPositive();

    }

    @Test
    @DisplayName("지도에 READ 이상의 권한을 가진 멤버는 지도의 장소 모두 조회할 수 있다.")
    void getOneMapTest_private() {
        // given
        Long mapId = 2L;
        Long memberId = 4L;

        //when
        MapDetail mapDetail = mapService.findOne(mapId, memberId);

        //then
        assertThat(mapDetail.getMapId()).isEqualTo(mapId);
        assertThat(mapDetail.getCategorizedPlaces()).isNotNull();

    }

    @Test
    @DisplayName("지도에 READ 이상의 권한을 가진 멤버는 지도의 장소 모두 조회할 수 있다.")
    void getOneMapTest_private_no_groupmember_fail() {
        // given
        Long mapId = 2L;
        Long memberId = 2L;

        assertThatThrownBy(() -> mapService.findOne(mapId, memberId))
                .isInstanceOf(ClientException.class)
                .hasMessage(ErrorStatusCodeAndMessage.FORBIDDEN.getMessage());

    }

    @Test
    @DisplayName("지도에 권한이 없는 멤버도 PUBLIC 지도의 장소 모두를 조회할 수 있다.")
    void getOneMapTest_public() {
        // given
        Long mapId = 1L;
        Long memberId = 4L;

        //when
        MapDetail mapDetail = mapService.findOne(mapId, memberId);

        //then
        assertThat(mapDetail.getMapId()).isEqualTo(1L);
        assertThat(mapDetail.getHostId()).isEqualTo(1L);
        assertThat(mapDetail.getCategorizedPlaces()).isNotNull();

    }

    @Test
    @DisplayName("지도 이름에 포함되는 문자열을 보내면, 해당하는 전채 공개 지도를 반환한다.")
    void searchPublicMapTest() {
        //given
        Optional<String> searchName = Optional.of("st");

        //when
        SimplePage<MapSimpleInfo> mapSimpleInfos = mapService.searchPublic(PageRequest.of(0, 10), searchName);

        //then
        assertThat(mapSimpleInfos.getContent()).isNotEmpty();
    }

    @Test
    @DisplayName("유저 아이디와 지도 이름에 포함되는 문자열을 보내면, 그 유저가 포함된 해당하는 그룹에 속한 지도를 반환한다.")
    void searchGroupMapListWithMapNameTest() {
        //given
        Long memberId = 1L;
        Optional<String> searchName = Optional.of("st");

        //when
        MapsResponse mapsResponse = mapService.searchGroup(memberId, searchName);

        //then
        assertThat(mapsResponse.getMapCount()).isEqualTo(1);
    }

    @Test
    @DisplayName("유저 아이디로 지도를 검색하면, 그 유저가 속해있는 그룹 지도를 반환한다.")
    void searchGroupMapListTest() {
        //given
        Long memberId = 1L;

        //when
        MapsResponse mapsResponse = mapService.searchGroup(memberId, Optional.empty());

        //then
        assertThat(mapsResponse.getMapCount()).isEqualTo(2);
    }


}
