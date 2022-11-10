package com.squadmap.map.ui.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

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
