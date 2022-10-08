package com.squadmap.map.integration;

import com.squadmap.map.application.MapService;
import com.squadmap.map.domain.Map;
import com.squadmap.map.infrastructure.MapRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.NoSuchElementException;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
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

}
