package com.squadmap.category.ui.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class CategoryRequest {

    private String categoryName;
    private String color;
    private Long mapId;

}
