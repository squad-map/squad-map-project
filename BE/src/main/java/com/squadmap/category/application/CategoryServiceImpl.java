package com.squadmap.category.application;

import com.squadmap.category.application.dto.CategoryInfo;
import com.squadmap.category.domain.Category;
import com.squadmap.category.infrastructure.CategoryRepository;
import com.squadmap.map.domain.Map;
import com.squadmap.map.infrastructure.MapRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService{

    private final CategoryRepository categoryRepository;
    private final MapRepository mapRepository;

    @Override
    public Long create(String name, String color, Long mapId, Long memberId) {

        Map map = mapRepository.findById(mapId)
                .orElseThrow(NoSuchElementException::new);

        if(!map.canAccess(memberId)) {
            throw new IllegalArgumentException();
        }
        if (isDuplicateName(name, map)) {
            throw new IllegalArgumentException();
        }

        Category category = categoryRepository.save(Category.of(name, color, map));
        return category.getId();
    }

    @Override
    public boolean isDuplicateName(String name, Map map) {
        return categoryRepository.existsByNameAndMap(name, map);
    }

    @Override
    public CategoryInfo readOne(Long categoryId, Long memberId) {
        Category category = categoryRepository.findCategoryFetchMapById(categoryId)
                .orElseThrow(NoSuchElementException::new);
        if(!category.getMap().canAccess(memberId)) {
            throw new IllegalArgumentException();
        }
        return CategoryInfo.from(category);
    }

    @Override
    public List<CategoryInfo> readAll(Long mapId, Long memberId) {
        Map map = mapRepository.findById(mapId).orElseThrow(RuntimeException::new);
        if(!map.canAccess(memberId)) {
            throw new IllegalArgumentException();
        }
        List<Category> categories = categoryRepository.findAllByMapId(mapId);
        return categories.stream()
                .map(CategoryInfo::from)
                .collect(Collectors.toUnmodifiableList());
    }

    @Override
    public CategoryInfo update(Long categoryId, String categoryName, String categoryColor, Long memberId) {
        Category category = categoryRepository.findCategoryFetchMapById(categoryId)
                .orElseThrow(RuntimeException::new);

        if(!category.getMap().canAccess(memberId)) {
            throw new IllegalArgumentException();
        }

        category.update(categoryName, categoryColor);

        return CategoryInfo.from(category);
    }
}
