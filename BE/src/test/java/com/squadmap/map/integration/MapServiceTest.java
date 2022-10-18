package com.squadmap.map.integration;

import com.squadmap.map.application.MapService;
import com.squadmap.map.application.dto.MapSimpleInfo;
import com.squadmap.map.domain.Map;
import com.squadmap.map.infrastructure.MapRepository;
import com.squadmap.place.domain.Place;
import com.squadmap.place.infrastructure.PlaceRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;
import java.util.NoSuchElementException;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.InstanceOfAssertFactories.map;

@SpringBootTest
@ActiveProfiles("test")
class MapServiceTest {

    @Autowired
    private MapService mapService;

    @Autowired
    private MapRepository mapRepository;

    @Test
    @DisplayName("map을 새롭게 생성할 수 있다.")
    void mapCreateTest() {
        //given
        Long memberId = 1L;
        String mapName = "first map";
        Boolean fullDisclosure = false;


        //when
        Long mapId = mapService.create(mapName, fullDisclosure, memberId);

        //then
        assertThat(mapId).isNotNull();
    }

    @Test
    @DisplayName("존재하는 지도라면, 지도를 업데이트할 수 있다.")
    void updateTest() {
        Long memberId = 1L;
        String mapName = "changed map";
        boolean fullDisclosure = true;

        Map map = mapRepository.save(Map.of("my map", false, memberId));

        mapService.update(memberId, map.getId(), mapName, fullDisclosure);

        Map changedMap = mapRepository.findById(map.getId())
                .orElseThrow(NoSuchElementException::new);

        assertThat(changedMap).isEqualTo(map);
        assertThat(changedMap.isFullDisclosure()).isTrue();
        assertThat(changedMap.getMemberId()).isEqualTo(memberId);
        assertThat(changedMap.getName()).isEqualTo(mapName);

    }

    @Test
    @DisplayName("전체 공개 지도는, 로그인하지 않은 유저도 조회할 수 있다.")
    void searchPublicMapList() {

        Page<MapSimpleInfo> mapSimpleInfos = mapService.readPublic(PageRequest.of(0, 5));
        List<MapSimpleInfo> content = mapSimpleInfos.getContent();

        assertThat(content.get(0).getHostNickname()).isEqualTo("nickname");
        assertThat(content.get(0).getMapName()).isEqualTo("first map");
        assertThat(content.get(0).getPlacesCount()).isEqualTo(2);
        assertThat(mapSimpleInfos.getTotalElements()).isEqualTo(1);

    }

    @Test
    @DisplayName("지도에 저장된 장소를 모두 조회할 수 있다.")
    void getOneMapTest() {

    }


}
