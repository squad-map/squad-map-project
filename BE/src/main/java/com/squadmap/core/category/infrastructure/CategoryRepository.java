package com.squadmap.core.category.infrastructure;

import com.squadmap.core.category.domain.Category;
import com.squadmap.core.map.domain.Map;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    boolean existsByNameAndMap(String name, Map map);

    @Query("select c from Category c where c.map.id = :mapId")
    List<Category> findAllByMap(@Param("mapId") Long mapId);

    Optional<Category> findByIdAndMap(Long id, Map map);

    @Query("select c from Category c join fetch c.map where c.id = :categoryId")
    Optional<Category> findCategoryFetchMapById(@Param("categoryId") Long categoryId);

    @Modifying
    @Query("delete from Category c where c.map.id = :mapId")
    void deleteCategoriesByMapId(@Param("mapId") Long map);

    @Modifying
    @Query("delete from Category c where c.id = :categoryId")
    void deleteCategoryById(@Param("categoryId") Long categoryId);
}
