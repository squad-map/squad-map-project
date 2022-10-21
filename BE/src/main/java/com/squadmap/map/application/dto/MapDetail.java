package com.squadmap.map.application.dto;

import com.squadmap.category.application.dto.CategoryInfo;
import com.squadmap.map.domain.Map;
import com.squadmap.member.domain.Member;
import com.squadmap.place.application.dto.PlaceSimpleInfo;
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
    private final int placesCount;
    private final List<CategorizedPlaces> categorizedPlaces;

    public static MapDetail of(Map map, Member member, int placesCount, List<CategorizedPlaces> categorizedPlaces) {

        return new MapDetail(map.getId(),
                map.getName(),
                map.getEmoji(),
                member.getId(),
                member.getNickname(),
                placesCount,
                categorizedPlaces);
    }

}
