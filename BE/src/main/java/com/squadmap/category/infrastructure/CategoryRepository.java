package com.squadmap.category.infrastructure;

import com.squadmap.category.domain.Category;
import com.squadmap.map.domain.Map;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    boolean existsByNameAndMap(String name, Map map);
}
