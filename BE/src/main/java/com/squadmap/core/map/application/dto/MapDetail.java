package com.squadmap.core.map.application.dto;

import com.squadmap.core.map.domain.Map;
import com.squadmap.member.domain.Member;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Getter
@RequiredArgsConstructor
public class MapDetail {

    private final Long mapId;
    private final String mapName;
    private final String mapEmoji;
    private final Long hostId;
    private final String hostNickname;
    private final String hostProfileImage;
    private final int placesCount;
    private final List<CategorizedPlaces> categorizedPlaces;

    public static MapDetail of(Map map, Member member, int placesCount, List<CategorizedPlaces> categorizedPlaces) {

        return new MapDetail(map.getId(),
                map.getName(),
                map.getEmoji(),
                member.getId(),
                member.getNickname(),
                member.getProfileImage(),
                placesCount,
                categorizedPlaces);
    }

}
