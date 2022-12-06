package com.squadmap.core.category.ui;

import com.squadmap.core.category.application.CategoryService;
import com.squadmap.core.category.application.dto.CategoryInfo;
import com.squadmap.core.category.ui.dto.CategoryRequest;
import com.squadmap.core.category.ui.dto.CategoryResponse;
import com.squadmap.core.category.ui.dto.CategoryUpdateRequest;
import com.squadmap.common.auth.Login;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/map/{mapId}")
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping("/categories")
    @ResponseStatus(HttpStatus.CREATED)
    public CategoryResponse create(@Login Long memberId, @PathVariable Long mapId, @RequestBody @Valid CategoryRequest categoryRequest) {
        Long categoryId = categoryService.create(categoryRequest.getCategoryName(),
                categoryRequest.getColor(),
                categoryRequest.getMapId(),
                memberId);
        return new CategoryResponse(categoryId);
    }

    @GetMapping("/categories/{categoryId}")
    public CategoryInfo readOne(@Login Long memberId, @PathVariable Long mapId, @PathVariable Long categoryId) {
        return categoryService.readOne(categoryId, memberId);
    }

    @GetMapping("/categories")
    public List<CategoryInfo> readCategories(@Login Long memberId, @PathVariable Long mapId) {
        return categoryService.readAll(mapId, memberId);
    }

    @PostMapping("/categories/update")
    public CategoryInfo update(@Login Long memberId, @PathVariable Long mapId, @RequestBody @Valid CategoryUpdateRequest categoryUpdateRequest) {

        return categoryService.update(
                categoryUpdateRequest.getCategoryId(),
                categoryUpdateRequest.getCategoryName(),
                categoryUpdateRequest.getCategoryColor(),
                memberId);
    }

}
