package com.squadmap.category.infrastructure;

import com.squadmap.category.domain.Category;
import com.squadmap.map.domain.Map;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    boolean existsByNameAndMap(String name, Map map);

    List<Category> findAllByMapId(Long mapId);

    Optional<Category> findByIdAndMapId(Long categoryId, Long mapId);

    @Query("select c from Category c join fetch c.map where c.id = :categoryId")
    Optional<Category> findCategoryFetchMapById(@Param("categoryId") Long categoryId);
}
