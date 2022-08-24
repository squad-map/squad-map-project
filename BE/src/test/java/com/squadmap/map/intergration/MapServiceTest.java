package com.squadmap.map.intergration;

import com.squadmap.map.application.MapService;
import com.squadmap.map.infrastructure.MapRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

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

}
