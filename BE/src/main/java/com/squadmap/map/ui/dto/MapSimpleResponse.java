package com.squadmap.map.ui.dto;

import com.squadmap.map.domain.Map;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class MapSimpleResponse {

    private final Long mapId;
    private final String mapName;
    private final String hostNickname;
    private final Integer registeredPlacesCount;

    public static MapSimpleResponse from(Map map) {
        return new MapSimpleResponse(map.getId(), map.getName(), null, 0);
    }

}
