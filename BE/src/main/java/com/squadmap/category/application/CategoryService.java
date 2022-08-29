package com.squadmap.category.application;

import com.squadmap.map.domain.Map;
import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly = true)
public interface CategoryService {

    @Transactional
    Long create(String name, String color, Long mapId);

    boolean isDuplicateName(String name, Map map);
}
