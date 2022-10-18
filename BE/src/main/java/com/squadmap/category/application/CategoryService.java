package com.squadmap.category.application;

import com.squadmap.category.domain.Category;
import com.squadmap.map.domain.Map;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface CategoryService {

    Long create(String name, String color, Long mapId);

    boolean isDuplicateName(String name, Map map);

}
