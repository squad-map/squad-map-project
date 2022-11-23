package com.squadmap.core.category.ui.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor
public class CategoryUpdateRequest {

    @NotNull
    private Long categoryId;
    @NotBlank
    private String categoryName;
    @NotBlank
    private String categoryColor;

}
