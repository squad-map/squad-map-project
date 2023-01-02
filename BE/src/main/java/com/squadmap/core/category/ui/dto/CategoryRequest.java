package com.squadmap.core.category.ui.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
public class CategoryRequest {

    @NotBlank
    private String categoryName;
    @NotBlank
    private String categoryColor;

}
