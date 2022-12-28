package com.squadmap.core.category.ui;

import com.squadmap.common.auth.Login;
import com.squadmap.common.dto.CommonResponse;
import com.squadmap.common.dto.SuccessCode;
import com.squadmap.core.category.application.CategoryService;
import com.squadmap.core.category.application.dto.CategoryInfo;
import com.squadmap.core.category.ui.dto.CategoryRequest;
import com.squadmap.core.category.ui.dto.CategoryResponse;
import com.squadmap.core.group.application.dto.AccessInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/map/{mapId}/categories")
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CommonResponse<CategoryResponse> create(@Login Long loginId, @PathVariable Long mapId, @RequestBody @Valid CategoryRequest categoryRequest) {
        Long categoryId = categoryService.create(AccessInfo.of(loginId, mapId),
                categoryRequest.getCategoryName(),
                categoryRequest.getColor());
        return CommonResponse.success(SuccessCode.CATEGORY_CREATE,
                new CategoryResponse(categoryId));
    }

    // 다시 살펴보기
    @GetMapping("/{categoryId}")
    public CommonResponse<CategoryInfo> readOne(@Login Long loginId, @PathVariable Long mapId, @PathVariable Long categoryId) {
        return CommonResponse.success(SuccessCode.CATEGORY_READ,
                categoryService.readOne(AccessInfo.of(loginId, mapId), categoryId));
    }

    @GetMapping
    public CommonResponse<List<CategoryInfo>> readCategories(@Login Long loginId, @PathVariable Long mapId) {
        return CommonResponse.success(SuccessCode.CATEGORY_READ_ALL,
                categoryService.readAll(AccessInfo.of(loginId, mapId)));
    }

    @PutMapping("/{categoryId}")
    public CommonResponse<CategoryInfo> update(@Login Long loginId, @PathVariable Long mapId, @PathVariable Long categoryId, @RequestBody @Valid CategoryRequest categoryUpdateRequest) {

        return CommonResponse.success(SuccessCode.CATEGORY_UPDATE,
                categoryService.update(AccessInfo.of(loginId, mapId),
                categoryId,
                categoryUpdateRequest.getCategoryName(),
                categoryUpdateRequest.getColor()));
    }

    @DeleteMapping("/{categoryId}")
    public CommonResponse<Void> delete(@Login Long loginId, @PathVariable Long mapId, @PathVariable Long categoryId) {
        categoryService.delete(AccessInfo.of(loginId, mapId), categoryId);

        return CommonResponse.emptyData(SuccessCode.CATEGORY_DELETE);
    }

}
