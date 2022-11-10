package com.squadmap.place.ui.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Max;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor
public class PlaceRequest {
    @NotBlank
    private String name;
    @NotBlank
    private String address;
    @NotNull
    private Double latitude;
    @NotNull
    private Double longitude;
    @Max(500)
    @NotBlank
    private String story;
    @NotBlank
    private String detailLink;
    @NotNull
    private Long mapId;
    @NotNull
    private Long categoryId;

}
