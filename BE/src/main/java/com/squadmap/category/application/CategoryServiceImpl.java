package com.squadmap.category.application;

import com.squadmap.category.application.dto.CategoryInfo;
import com.squadmap.category.domain.Category;
import com.squadmap.category.infrastructure.CategoryRepository;
import com.squadmap.common.excetpion.ClientException;
import com.squadmap.common.excetpion.ErrorStatusCodeAndMessage;
import com.squadmap.group.application.GroupMemberService;
import com.squadmap.map.domain.Map;
import com.squadmap.map.infrastructure.MapRepository;
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
public class CategoryServiceImpl implements CategoryService{

    private final CategoryRepository categoryRepository;
    private final MapRepository mapRepository;
    private final GroupMemberService groupMemberService;

    @Override
    @Transactional
    public Long create(String name, String color, Long mapId, Long memberId) {

        Map map = mapRepository.findById(mapId)
                .orElseThrow(() -> new ClientException(ErrorStatusCodeAndMessage.NO_SUCH_MAP));

        groupMemberService.checkHasMaintainLevel(mapId, memberId);

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
    public CategoryInfo readOne(Long categoryId, Long memberId) {
        Category category = categoryRepository.findCategoryFetchMapById(categoryId)
                .orElseThrow(() -> new ClientException(ErrorStatusCodeAndMessage.NO_SUCH_CATEGORY));

        if (!category.getMap().isFullDisclosure()) {
            groupMemberService.checkHasReadLevel(category.getMap().getId(), memberId);
        }

        return CategoryInfo.from(category);
    }

    @Override
    public List<CategoryInfo> readAll(Long mapId, Long memberId) {
        Map map = mapRepository.findById(mapId)
                .orElseThrow(() -> new ClientException(ErrorStatusCodeAndMessage.NO_SUCH_MAP));

        if (!map.isFullDisclosure()) {
            groupMemberService.checkHasReadLevel(mapId, memberId);
        }

        List<Category> categories = categoryRepository.findAllByMapId(mapId);
        return categories.stream()
                .map(CategoryInfo::from)
                .collect(Collectors.toUnmodifiableList());
    }

    @Override
    @Transactional
    public CategoryInfo update(Long categoryId, String categoryName, String categoryColor, Long memberId) {

        Category category = categoryRepository.findCategoryFetchMapById(categoryId)
                .orElseThrow(() -> new ClientException(ErrorStatusCodeAndMessage.NO_SUCH_CATEGORY));

        groupMemberService.checkHasMaintainLevel(category.getMapId(), memberId);

        category.update(categoryName, categoryColor);

        return CategoryInfo.from(category);
    }
}
