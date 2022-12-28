package com.squadmap.category.integration;

import com.squadmap.IntegrationTest;
import com.squadmap.common.excetpion.ClientException;
import com.squadmap.common.excetpion.ErrorStatusCodeAndMessage;
import com.squadmap.core.category.application.CategoryService;
import com.squadmap.core.category.application.dto.CategoryInfo;
import com.squadmap.core.category.infrastructure.CategoryRepository;
import com.squadmap.core.group.application.dto.AccessInfo;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@IntegrationTest
public class CategoryServiceTest {

    @Autowired
    private CategoryService categoryService;
    @Autowired
    private CategoryRepository categoryRepository;

    @Test
    @DisplayName("로그인한 유저 중 지도에 권한이 있는 유저라면, 카테고리를 생성할 수 있다.")
    void createTest() {
        //given
        String name = "test category";
        String color = "code";
        Long mapId = 1L;
        Long memberId = 1L;

        //when
        Long categoryId = categoryService.create(AccessInfo.of(memberId, mapId), name, color);

        //then
        assertThat(categoryId).isNotNull();
    }

    @Test
    @DisplayName("로그인한 유저 중 지도에 권한이 READ 유저라면, 카테고리를 생성할 수 없다.")
    void createTest_fail_readPermission() {
        //given
        String name = "test category";
        String color = "code";
        Long mapId = 1L;
        Long memberId = 3L;

        //when
        assertThatThrownBy(() ->categoryService.create(AccessInfo.of(memberId, mapId), name, color))
                .isInstanceOf(ClientException.class)
                .hasMessage(ErrorStatusCodeAndMessage.FORBIDDEN.getMessage());

    }


    @Test
    @DisplayName("로그인한 유저 중 지도에 권한이 있는 유저라면, 카테고리를 조회할 수 있다.")
    void readOneTest() {
        //given
        Long categoryId = 1L;
        Long memberId = 1L;
        Long mapId = 1L;

        //when
        CategoryInfo categoryInfo = categoryService.readOne(AccessInfo.of(memberId, mapId), categoryId);

        //then
        assertThat(categoryInfo.getCategoryId()).isEqualTo(categoryId);

    }

    @Test
    @DisplayName("사용자가 존재하지 않는 카테고리를 조회하고자하면, Exception이 발생한다.")
    void readOneTest_fail_no_exist() {
        //given
        Long categoryId = 100L;
        Long memberId = 1L;
        Long mapId = 1L;

        //when
        assertThatThrownBy(() -> categoryService.readOne(AccessInfo.of(memberId, mapId), categoryId))
                .isInstanceOf(ClientException.class)
                .hasMessage(ErrorStatusCodeAndMessage.NO_SUCH_CATEGORY.getMessage());

    }

    @Test
    @DisplayName("로그인한 유저 중 지도에 권한이 없는 유저라도 지도가 public이면 조회할 수 있다.")
    void readOneTest_public_no_PermissionLevel() {
        //given
        Long categoryId = 1L;
        Long memberId = 4L;
        Long mapId = 1L;
        CategoryInfo categoryInfo = categoryService.readOne(AccessInfo.of(memberId, mapId), categoryId);

        assertThat(categoryInfo.getCategoryId()).isEqualTo(categoryId);

    }

    @Test
    @DisplayName("로그인한 유저 중 지도에 권한이 없는 유저라면 비공개 지도내의 카테고리를 조회할 수 없다.")
    void readOneTest_fail_no_PermissionLevel() {
        //given
        Long categoryId = 3L;
        Long memberId = 5L;
        Long mapId = 2L;


        assertThatThrownBy(() -> categoryService.readOne(AccessInfo.of(memberId, mapId), categoryId))
                .isInstanceOf(ClientException.class)
                .hasMessage(ErrorStatusCodeAndMessage.FORBIDDEN.getMessage());

    }

    @Test
    @DisplayName("로그인한 유저 중 지도에 MATNTAIN 이상의 권한이 있는 유저라면, 카테고리를 수정할 수 있다.")
    void updateTest() {
        Long categoryId = 1L;
        Long memberId = 1L;
        Long mapId = 1L;
        String updatedName = "updated name";
        String updatedColor = "updated color";

        CategoryInfo categoryInfo = categoryService.readOne(AccessInfo.of(memberId, mapId), categoryId);

        CategoryInfo updated = categoryService.update(AccessInfo.of(memberId, mapId), categoryId, updatedName, updatedColor);

        assertThat(updated.getCategoryId()).isEqualTo(categoryInfo.getCategoryId());
        assertThat(updated.getCategoryName()).isNotEqualTo(categoryInfo.getCategoryName());
        assertThat(updated.getCategoryColor()).isNotEqualTo(categoryInfo.getCategoryColor());
        assertThat(updated.getCategoryName()).isEqualTo(updatedName);
        assertThat(updated.getCategoryColor()).isEqualTo(updatedColor);

    }

    @Test
    @DisplayName("사용자가 존재하지 않는 카테고리를 수정하려한다면, Exception이 발생한다.")
    void updateTest_fail_not_exist_category() {
        Long categoryId = 100L;
        Long memberId = 1L;
        Long mapId = 1L;
        String updatedName = "updated name";
        String updatedColor = "updated color";

        assertThatThrownBy(() -> categoryService.update(AccessInfo.of(memberId, mapId), categoryId, updatedName, updatedColor))
                .isInstanceOf(ClientException.class)
                .hasMessage(ErrorStatusCodeAndMessage.NO_SUCH_CATEGORY.getMessage());

    }

    @Test
    @DisplayName("READ 권한의 사용자가 카테고리를 수정하려한다면, Exception이 발생한다.")
    void updateTest_fail_read_permission() {
        Long categoryId = 1L;
        Long memberId = 3L;
        Long mapId = 1L;
        String updatedName = "updated name";
        String updatedColor = "updated color";

        assertThatThrownBy(() -> categoryService.update(AccessInfo.of(memberId, mapId), categoryId, updatedName, updatedColor))
                .isInstanceOf(ClientException.class)
                .hasMessage(ErrorStatusCodeAndMessage.FORBIDDEN.getMessage());

    }


    @Test
    @DisplayName("삭제하고자하는 카테고리에 포함된 장소가 없고, MAINTAIN 이상의 사용자라면 카테고리를 삭제할 수 있다.")
    void deleteTest() {
        AccessInfo accessInfo = AccessInfo.of(1L, 1L);
        Long categoryId = 2L;

        categoryService.delete(accessInfo, categoryId);

        assertThat(categoryRepository.findById(categoryId)).isNotPresent();

    }

    @Test
    @DisplayName("삭제하고자하는 카테고리에 포함된 장소가 있다면, 카테고리를 삭제할 수 없다.")
    void deleteTest_fail_has_place() {
        AccessInfo accessInfo = AccessInfo.of(1L, 1L);
        Long categoryId = 1L;

        assertThatThrownBy(() -> categoryService.delete(accessInfo, categoryId))
                .isInstanceOf(ClientException.class)
                .hasMessage(ErrorStatusCodeAndMessage.CATEGORY_HAS_PLACE.getMessage());

    }

    @Test
    @DisplayName("MAINTAIN 미만의 권한을 가진 사용자라면 카테고리를 삭제할 수 있다.")
    void deleteTest_fail_have_not_level() {
        AccessInfo accessInfo = AccessInfo.of(4L, 1L);
        Long categoryId = 2L;

        assertThatThrownBy(() -> categoryService.delete(accessInfo, categoryId))
                .isInstanceOf(ClientException.class)
                .hasMessage(ErrorStatusCodeAndMessage.FORBIDDEN.getMessage());

    }


}
