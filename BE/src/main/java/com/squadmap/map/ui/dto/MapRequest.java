package com.squadmap.map.ui.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MapRequest {

    private String mapName;
    private String mapEmoji;
    private Boolean fullDisclosure;

}
