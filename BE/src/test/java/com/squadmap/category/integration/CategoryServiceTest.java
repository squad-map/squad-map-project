package com.squadmap.category.integration;

import com.squadmap.category.application.CategoryService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
public class CategoryServiceTest {

    @Autowired
    private CategoryService categoryService;

    @Test
    void createTest() {
        //given
        String name = "first category";
        String color = "code";
        Long mapId = 1L;

        //when
        Long categoryId = categoryService.create(name, color, mapId);

        //then
        assertThat(categoryId).isNotNull();
    }
}
