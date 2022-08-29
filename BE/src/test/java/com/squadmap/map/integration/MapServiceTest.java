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
        Boolean isPrivate = false;

        Long expectedId = 1L;

        //when
        Long mapId = mapService.create(mapName, isPrivate, memberId);

        //then
        assertThat(mapId).isEqualTo(expectedId);
    }

    @Test
    @DisplayName("존재하는 지도라면, 지도를 업데이트할 수 있다.")
    void updateTest() {
        Long memberId = 1L;
        Long mapId = 1L;
        String mapName = "changed map";
        Boolean isPrivate = true;

        Map map = mapRepository.save(Map.of("first map", false, memberId));

        mapService.update(memberId, mapId, mapName, isPrivate);

        Map changedMap = mapRepository.findById(mapId)
                .orElseThrow(NoSuchElementException::new);

        assertThat(changedMap).isEqualTo(map);
        assertThat(changedMap.getIsPrivate()).isTrue();
        assertThat(changedMap.getMemberId()).isEqualTo(mapId);
        assertThat(changedMap.getName()).isEqualTo(mapName);

    }

}
