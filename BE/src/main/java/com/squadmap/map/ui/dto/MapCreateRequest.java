package com.squadmap.map.ui.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MapCreateRequest {

    private String mapName;
    private Boolean isPrivate;

}
