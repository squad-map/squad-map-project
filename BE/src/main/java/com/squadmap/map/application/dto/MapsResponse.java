package com.squadmap.map.application.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Getter
@RequiredArgsConstructor
public class MapsResponse {

    private final int mapCount;
    private final List<MapSimpleInfo> maps;

}
