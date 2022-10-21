package com.squadmap.map.ui.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MapRequest {

    private String mapName;
    private String emoji;
    private Boolean fullDisclosure;

}
