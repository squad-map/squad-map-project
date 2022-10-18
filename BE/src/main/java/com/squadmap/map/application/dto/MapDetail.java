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
    private final Long hostId;
    private final String hostNickname;
    private final int placesCount;
    private final java.util.Map<CategoryInfo, List<PlaceSimpleInfo>> categorizedPlaces;

    public static MapDetail of(Map map, Member member, java.util.Map<CategoryInfo, List<PlaceSimpleInfo>> categorizedPlaces) {

        return new MapDetail(map.getId(),
                map.getName(),
                member.getId(),
                member.getNickname(),
                map.getPlacesCount(),
                categorizedPlaces);
    }

}
