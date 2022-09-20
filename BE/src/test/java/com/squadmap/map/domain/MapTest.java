package com.squadmap.map.domain;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class MapTest {

    private Map map;

    @Test
    @DisplayName("지도를 업데이트 할 수 있다.")
    void updateTest() {

        map = Map.of("first map", false, 1L);

        String updateName = "changed map";
        map.update(updateName, true);

        assertThat(map.getName()).isEqualTo(updateName);
        assertThat(map.getIsPrivate()).isTrue();
    }
}
