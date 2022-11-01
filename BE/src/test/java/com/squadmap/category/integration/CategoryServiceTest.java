package com.squadmap.category.integration;

import com.squadmap.category.application.CategoryService;
import com.squadmap.category.application.dto.CategoryInfo;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class CategoryServiceTest {

    @Autowired
    private CategoryService categoryService;

    @Test
    @DisplayName("로그인한 유저 중 지도에 권한이 있는 유저라면, 카테고리를 생성할 수 있다.")
    void createTest() {
        //given
        String name = "test category";
        String color = "code";
        Long mapId = 1L;
        Long memberId = 1L;

        //when
        Long categoryId = categoryService.create(name, color, mapId, memberId);

        //then
        assertThat(categoryId).isNotNull();
    }


    @Test
    @DisplayName("로그인한 유저 중 지도에 권한이 있는 유저라면, 카테고리를 조회할 수 있다.")
    void readOneTest() {
        //given
        Long categoryId = 1L;
        Long memberId = 1L;

        //when
        CategoryInfo categoryInfo = categoryService.readOne(categoryId, memberId);

        //then
        assertThat(categoryInfo.getCategoryId()).isEqualTo(categoryId);

    }

    @Test
    @DisplayName("로그인한 유저 중 지도에 권한이 있는 유저라면, 카테고리를 수정할 수 있다.")
    void updateTest() {
        Long categoryId = 1L;
        Long memberId = 1L;
        String updatedName = "updated name";
        String updatedColor = "updated color";

        CategoryInfo categoryInfo = categoryService.readOne(categoryId, memberId);

        CategoryInfo updated = categoryService.update(categoryId, updatedName, updatedColor, memberId);

        assertThat(updated.getCategoryId()).isEqualTo(categoryInfo.getCategoryId());
        assertThat(updated.getCategoryName()).isNotEqualTo(categoryInfo.getCategoryName());
        assertThat(updated.getCategoryColor()).isNotEqualTo(categoryInfo.getCategoryColor());
        assertThat(updated.getCategoryName()).isEqualTo(updatedName);
        assertThat(updated.getCategoryColor()).isEqualTo(updatedColor);

    }

}
