package com.squadmap.core.map.application.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class MapSimpleInfo {

    private final Long id;
    private final String mapName;
    private final String mapEmoji;
    private final Long hostId;
    private final String hostNickname;
    private final String hostProfileImage;
    private final int placesCount;

}
