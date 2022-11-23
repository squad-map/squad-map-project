package com.squadmap.map.ui.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MapRequest {

    @NotBlank
    private String mapName;
    @NotBlank
    private String mapEmoji;
    @NotNull
    private Boolean fullDisclosure;

}
