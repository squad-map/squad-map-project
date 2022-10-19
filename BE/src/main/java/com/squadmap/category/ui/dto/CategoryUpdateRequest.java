package com.squadmap.category.ui.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CategoryUpdateRequest {

    private Long categoryId;
    private String categoryName;
    private String categoryColor;

}
