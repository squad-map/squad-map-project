package com.squadmap.category.acceptance;

import com.squadmap.assured.RestAssuredTest;
import com.squadmap.core.category.ui.dto.CategoryRequest;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.restdocs.snippet.Snippet;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.notNullValue;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.restdocs.restassured3.RestAssuredRestDocumentation.document;

public class CategoryAcceptanceTest extends RestAssuredTest {

    /*
      category Create Request
      categoryName: String
      color : String
      mapId : Long
     */
    private static final Snippet CREATE_REQUEST_FIELDS = requestFields(
            fieldWithPath("category_name").type(JsonFieldType.STRING).description("카테고리 이름"),
            fieldWithPath("color").type(JsonFieldType.STRING).description("색상 코드"),
            fieldWithPath("map_id").type(JsonFieldType.NUMBER).description("카테고리를 생성할 지도 아이디")
    );

    private static final Snippet CREATE_RESPONSE_FIELDS = responseFields(
            fieldWithPath("category_id").type(JsonFieldType.NUMBER).description("카테고리 아이디")
    );


    @Test
    @DisplayName("정상적인 요청이라면, 상태코드 201을 반환한다.")
    void createTest() {
        String accessToken = jwtProvider.generateAccessToken(1L);
        String categoryName = "first test category";
        String color = "#0000FF";
        Long mapId = 1L;

        CategoryRequest categoryRequest = new CategoryRequest(categoryName, color);

        given(this.specification).filter(document(DEFAULT_RESTDOC_PATH, CREATE_REQUEST_FIELDS, CREATE_RESPONSE_FIELDS, AUTHORIZATION_HEADER))
                .accept(ContentType.JSON)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .body(categoryRequest)
                .log().all()

        .when().post("/categories")

        .then().statusCode(HttpStatus.CREATED.value())
                .body("category_id", notNullValue());
    }

    private final static Snippet READ_PATH_PARAMETERS = pathParameters(
            parameterWithName("category_id").description("카테고리의 아이디")
    );

    private final static Snippet READ_RESPONSE_FIELDS = responseFields(
            fieldWithPath("category_id").type(JsonFieldType.NUMBER).description("카테고리의 아이디"),
            fieldWithPath("category_name").type(JsonFieldType.STRING).description("카테고리의 이름"),
            fieldWithPath("category_color").type(JsonFieldType.STRING).description("카테고리의 색상")
    );

    @Test
    @DisplayName("로그인한 유저 중 지도에 권한이 있는 유저라면 카테고리를 조회할 수 있다.")
    void readOneTest() {

        Long categoryId = 1L;

        given(this.specification).filter(document(DEFAULT_RESTDOC_PATH, AUTHORIZATION_HEADER, READ_PATH_PARAMETERS, READ_RESPONSE_FIELDS))
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .contentType(ContentType.JSON)
                //.pathParam("category_id", categoryId.intValue())
                .header(HttpHeaders.AUTHORIZATION, this.createAuthorizationHeader(1L))
                .log().all()

        .when().get("/categories/{category_id}",categoryId.intValue())

        .then().statusCode(HttpStatus.OK.value())
                .body("category_id", equalTo(categoryId.intValue()))
                .body("category_name", notNullValue())
                .body("category_color", notNullValue())
                .log().all();
    }

    private static final Snippet READ_ALL_CATEGORIES_IN_MAP_REQUEST_PARAMS = requestParameters(
            parameterWithName("map").description("지도 아이디")
    );

    private static final Snippet READ_ALL_CATEGORIES_IN_MAP_RESPONSE_FIELDS = responseFields(
            fieldWithPath("[].category_id").type(JsonFieldType.NUMBER).description("카테고리 아이디"),
            fieldWithPath("[].category_name").type(JsonFieldType.STRING).description("카테고리 이름"),
            fieldWithPath("[].category_color").type(JsonFieldType.STRING).description("카테고리 색상")
    );

    @Test
    @DisplayName("로그인 한 유저 중 권한이 있는 지도라면, 지도에 포함된 모든 카테고리를 조회할 수 있다.")
    void ReadCategoriesInOneMapTest() {
        Long mapId = 1L;

        given(this.specification).filter(document(DEFAULT_RESTDOC_PATH, AUTHORIZATION_HEADER, READ_ALL_CATEGORIES_IN_MAP_REQUEST_PARAMS, READ_ALL_CATEGORIES_IN_MAP_RESPONSE_FIELDS))
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .contentType(ContentType.JSON)
                .queryParam("map", mapId.intValue())
                .header(HttpHeaders.AUTHORIZATION, this.createAuthorizationHeader(1L))
                .log().all()

        .when().get("/categories")

                .then().log().all();

    }

}
