package com.squadmap.category.application;

import com.squadmap.category.application.dto.CategoryInfo;
import com.squadmap.category.domain.Category;
import com.squadmap.category.infrastructure.CategoryRepository;
import com.squadmap.common.excetpion.ClientException;
import com.squadmap.common.excetpion.ErrorStatusCodeAndMessage;
import com.squadmap.group.domain.GroupMember;
import com.squadmap.group.domain.PermissionLevel;
import com.squadmap.group.infrastructure.GroupMemberRepository;
import com.squadmap.map.domain.Map;
import com.squadmap.map.infrastructure.MapRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CategoryServiceImpl implements CategoryService{

    private final CategoryRepository categoryRepository;
    private final MapRepository mapRepository;
    private final GroupMemberRepository groupMemberRepository;

    @Override
    @Transactional
    public Long create(String name, String color, Long mapId, Long memberId) {

        Map map = mapRepository.findById(mapId)
                .orElseThrow(NoSuchElementException::new);

        GroupMember groupMember = groupMemberRepository.findByMapIdAndMemberId(mapId, memberId)
                .orElseThrow(() -> new ClientException(ErrorStatusCodeAndMessage.NO_SUCH_GROUP_MEMBER));

        if(!groupMember.hasRequiredPermission(PermissionLevel.MAINTAIN)) {
            throw new ClientException(ErrorStatusCodeAndMessage.FORBIDDEN);
        }
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

        if(!groupMemberRepository.existsByMapIdAndMemberId(category.getMap().getId(), memberId) && !category.getMap().isFullDisclosure()) {
            throw new ClientException(ErrorStatusCodeAndMessage.NO_SUCH_GROUP_MEMBER);
        }

        return CategoryInfo.from(category);
    }

    @Override
    public List<CategoryInfo> readAll(Long mapId, Long memberId) {
        Map map = mapRepository.findById(mapId)
                .orElseThrow(() -> new ClientException(ErrorStatusCodeAndMessage.NO_SUCH_MAP));

        if(!groupMemberRepository.existsByMapIdAndMemberId(mapId, memberId) && !map.isFullDisclosure()) {
            throw new ClientException(ErrorStatusCodeAndMessage.NO_SUCH_GROUP_MEMBER);
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

        GroupMember groupMember = groupMemberRepository.findByMapIdAndMemberId(category.getMap().getId(), memberId)
                .orElseThrow(() -> new ClientException(ErrorStatusCodeAndMessage.NO_SUCH_GROUP_MEMBER));

        if(!groupMember.hasRequiredPermission(PermissionLevel.MAINTAIN)) {
            throw new ClientException(ErrorStatusCodeAndMessage.FORBIDDEN);
        }

        category.update(categoryName, categoryColor);

        return CategoryInfo.from(category);
    }
}
