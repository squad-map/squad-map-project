package com.squadmap.core.category.application;

import com.squadmap.core.access.RequiredPermission;
import com.squadmap.core.category.application.dto.CategoryInfo;
import com.squadmap.core.category.domain.Category;
import com.squadmap.core.category.infrastructure.CategoryRepository;
import com.squadmap.common.excetpion.ClientException;
import com.squadmap.common.excetpion.ErrorStatusCodeAndMessage;
import com.squadmap.core.group.application.GroupMemberService;
import com.squadmap.core.group.application.dto.AccessInfo;
import com.squadmap.core.group.domain.PermissionLevel;
import com.squadmap.core.map.domain.Map;
import com.squadmap.core.map.infrastructure.MapRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final MapRepository mapRepository;

    @Override
    @Transactional
    @RequiredPermission(level = PermissionLevel.MAINTAIN)
    public Long create(AccessInfo accessInfo, String name, String color) {

        Map map = mapRepository.findById(accessInfo.getMapId())
                .orElseThrow(() -> new ClientException(ErrorStatusCodeAndMessage.NO_SUCH_MAP));

        if (isDuplicateName(name, map)) {
            throw new ClientException(ErrorStatusCodeAndMessage.DUPLICATE_CATEGORY);
        }

        Category category = categoryRepository.save(Category.of(name, color, map));
        return category.getId();
    }

    @Override
    public boolean isDuplicateName(String name, Map map) {
        return categoryRepository.existsByNameAndMap(name, map);
    }

    @Override
    @RequiredPermission
    public CategoryInfo readOne(AccessInfo accessInfo, Long categoryId) {
        Category category = categoryRepository.findCategoryFetchMapById(categoryId)
                .orElseThrow(() -> new ClientException(ErrorStatusCodeAndMessage.NO_SUCH_CATEGORY));


        return CategoryInfo.from(category);
    }

    @Override
    @RequiredPermission
    public List<CategoryInfo> readAll(AccessInfo accessInfo) {
        Map map = mapRepository.findById(accessInfo.getMapId())
                .orElseThrow(() -> new ClientException(ErrorStatusCodeAndMessage.NO_SUCH_MAP));

        List<Category> categories = categoryRepository.findAllByMap(accessInfo.getMapId());
        return categories.stream()
                .map(CategoryInfo::from)
                .collect(Collectors.toUnmodifiableList());
    }

    @Override
    @Transactional
    @RequiredPermission(level = PermissionLevel.MAINTAIN)
    public CategoryInfo update(AccessInfo accessInfo, Long categoryId,
                               String categoryName, String categoryColor) {

        Category category = categoryRepository.findCategoryFetchMapById(categoryId)
                .orElseThrow(() -> new ClientException(ErrorStatusCodeAndMessage.NO_SUCH_CATEGORY));

        category.update(categoryName, categoryColor);

        return CategoryInfo.from(category);
    }
}
