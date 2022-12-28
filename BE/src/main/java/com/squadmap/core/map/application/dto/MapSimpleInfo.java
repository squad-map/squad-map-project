package com.squadmap.core.map.application.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class MapSimpleInfo {

    private Long id;
    private String mapName;
    private String mapEmoji;
    private Long hostId;
    private String hostNickname;
    private String hostProfileImage;
    private int placesCount;

}
