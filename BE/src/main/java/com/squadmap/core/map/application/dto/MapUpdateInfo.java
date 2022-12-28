package com.squadmap.core.map.application.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class MapUpdateInfo {

    private final Long mapId;
    private final String mapName;
    private final String mapEmoji;
    private final boolean fullDisclosure;
}
