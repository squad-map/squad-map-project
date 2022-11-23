package com.squadmap.core.category.application;

import com.squadmap.core.category.application.dto.CategoryInfo;
import com.squadmap.core.map.domain.Map;

import java.util.List;

public interface CategoryService {

    Long create(String name, String color, Long mapId, Long memberId);

    boolean isDuplicateName(String name, Map map);

    CategoryInfo readOne(Long categoryId, Long memberId);

    List<CategoryInfo> readAll(Long mapId, Long memberId);

    CategoryInfo update(Long categoryId, String categoryName, String categoryColor, Long memberId);
}
