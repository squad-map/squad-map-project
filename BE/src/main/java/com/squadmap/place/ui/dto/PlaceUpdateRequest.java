package com.squadmap.place.ui.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor
public class PlaceUpdateRequest {

    @NotNull
    private Long categoryId;
    @NotBlank
    @Size(min = 1, max = 500)
    private String story;
}
