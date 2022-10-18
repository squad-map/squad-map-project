package com.squadmap.category.application.dto;

import com.squadmap.category.domain.Category;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
@EqualsAndHashCode
public class CategoryInfo {

    private final Long categoryId;
    private final String categoryName;
    private final String categoryColor;

    public static CategoryInfo from(Category category) {
        return new CategoryInfo(category.getId(), category.getName(), category.getColor());
    }
}
