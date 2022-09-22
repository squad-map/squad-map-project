package com.squadmap.category.ui;

import com.squadmap.category.application.CategoryService;
import com.squadmap.category.ui.dto.CategoryRequest;
import com.squadmap.category.ui.dto.CategoryResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping("/categories")
    @ResponseStatus(HttpStatus.CREATED)
    public CategoryResponse create(@RequestBody CategoryRequest categoryRequest) {
        Long categoryId = categoryService.create(categoryRequest.getCategoryName(),
                categoryRequest.getColor(),
                categoryRequest.getMapId());
        return new CategoryResponse(categoryId);
    }

}
