package com.squadmap.category.acceptance;

import com.squadmap.assured.RestAssuredTest;
import com.squadmap.category.ui.dto.CategoryRequest;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.restdocs.snippet.Snippet;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.restassured3.RestAssuredRestDocumentation.document;

public class CategoryAcceptanceTest extends RestAssuredTest {


    /*
      category Create Request
      categoryName: String
      color : String
      mapId : Long
     */
    private static final Snippet CREATE_REQUEST_FIELDS = requestFields(
            fieldWithPath("categoryName").type(JsonFieldType.STRING).description("카테고리 이름"),
            fieldWithPath("color").type(JsonFieldType.STRING).description("색상 코드"),
            fieldWithPath("mapId").type(JsonFieldType.NUMBER).description("카테고리를 생성할 지도 아이디")
    );

    private static final Snippet CREATE_RESPONSE_FIELDS = responseFields(
            fieldWithPath("categoryId").type(JsonFieldType.NUMBER).description("카테고리 아이디")
    );


    @Test
    @DisplayName("정상적인 요청이라면, 상태코드 201을 반환한다.")
    void createTest() {
        String categoryName = "first category";
        String color = "#0000FF";
        Long mapId = 1L;

        CategoryRequest categoryRequest = new CategoryRequest(categoryName, color, mapId);

        given(this.specification).filter(document(DEFAULT_RESTDOC_PATH, CREATE_REQUEST_FIELDS, CREATE_RESPONSE_FIELDS))
                .accept(ContentType.JSON)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .body(categoryRequest)
                .log().all()

        .when().post("/categories")

        .then().statusCode(HttpStatus.CREATED.value())
                .body("categoryId", equalTo(1));
    }

}