package com.squadmap.map.domain;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class MapTest {

    private Map map;

    @Test
    @DisplayName("지도를 업데이트 할 수 있다.")
    void updateTest() {

        map = Map.of("first map", "U+1F600",false, 1L);

        String updateName = "changed map";
        String updateEmoji = "U+1F603";
        map.update(updateName, updateEmoji,true);

        assertThat(map.getName()).isEqualTo(updateName);
        assertThat(map.getEmoji()).isEqualTo(updateEmoji);
        assertThat(map.isFullDisclosure()).isTrue();
    }
}
