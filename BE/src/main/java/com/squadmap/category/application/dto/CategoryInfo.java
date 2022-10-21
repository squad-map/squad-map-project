package com.squadmap.category.application.dto;

import com.squadmap.category.domain.Category;
import lombok.*;

@Getter
@RequiredArgsConstructor
@EqualsAndHashCode
public class CategoryInfo {

    private final Long categoryId;
    private final String categoryName;
    private final String categoryColor;

    public static CategoryInfo from(final Category category) {
        return new CategoryInfo(category.getId(), category.getName(), category.getColor());
    }

}
