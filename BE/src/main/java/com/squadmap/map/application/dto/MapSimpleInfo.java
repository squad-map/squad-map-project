package com.squadmap.map.application.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class MapSimpleInfo {

    private final Long id;
    private final String mapName;
    private final Long hostId;
    private final String hostNickname;
    private final int placesCount;

}