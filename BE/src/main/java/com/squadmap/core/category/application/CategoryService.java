package com.squadmap.core.category.application;

import com.squadmap.core.category.application.dto.CategoryInfo;
import com.squadmap.core.group.application.dto.AccessInfo;
import com.squadmap.core.map.domain.Map;

import java.util.List;

public interface CategoryService {

    Long create(AccessInfo accessInfo, String name, String color);

    boolean isDuplicateName(String name, Map map);

    CategoryInfo readOne(AccessInfo accessInfo, Long categoryId);

    List<CategoryInfo> readAll(AccessInfo accessInfo);

    CategoryInfo update(AccessInfo accessInfo, Long categoryId, String categoryName, String categoryColor);
}
