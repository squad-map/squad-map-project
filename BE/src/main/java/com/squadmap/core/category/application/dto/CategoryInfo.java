package com.squadmap.core.category.application.dto;

import com.squadmap.core.category.domain.Category;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Getter
@RequiredArgsConstructor
@EqualsAndHashCode
@ToString
public class CategoryInfo {

    private final Long categoryId;
    private final String categoryName;
    private final String categoryColor;

    public static CategoryInfo from(final Category category) {
        return new CategoryInfo(category.getId(), category.getName(), category.getColor());
    }

}
