package com.squadmap.category.application;

import com.squadmap.category.domain.Category;
import com.squadmap.category.infrastructure.CategoryRepository;
import com.squadmap.map.domain.Map;
import com.squadmap.map.infrastructure.MapRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService{

    private final CategoryRepository categoryRepository;
    private final MapRepository mapRepository;

    @Override
    public Long create(String name, String color, Long mapId) {
        // TODO 로그인 유저 권한 체크

        Map map = mapRepository.findById(mapId)
                .orElseThrow(NoSuchElementException::new);

//        if (isDuplicateName(name, map)) {
//            throw new IllegalArgumentException();
//        }

        Category saved = categoryRepository.save(Category.of(name, color, map));
        return saved.getId();
    }

    @Override
    public boolean isDuplicateName(String name, Map map) {
        return categoryRepository.existsByNameAndMap(name, map);
    }
}
