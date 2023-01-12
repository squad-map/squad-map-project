package com.squadmap.category.acceptance;

import com.squadmap.assured.RestAssuredTest;
import com.squadmap.common.dto.SuccessCode;
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
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.restdocs.restassured3.RestAssuredRestDocumentation.document;

public class CategoryAcceptanceTest extends RestAssuredTest {

    /*
      category Create Request
      categoryName: String
      color : String
      mapId : Long
     */
    private static final Snippet CREATE_UPDATE_REQUEST_FIELDS = requestFields(
            fieldWithPath("category_name").type(JsonFieldType.STRING).description("카테고리 이름"),
            fieldWithPath("category_color").type(JsonFieldType.STRING).description("색상 코드")
    );

    private static final Snippet CREATE_RESPONSE_FIELDS = generateCommonResponse(
            fieldWithPath(makeFieldName("category_id")).type(JsonFieldType.NUMBER).description("카테고리 아이디")
    );

    @Test
    @DisplayName("정상적인 요청이라면, 상태코드 201을 반환한다.")
    void createTest() {
        Long memberId = 1L;
        String categoryName = "first test category";
        String color = "#0000FF";
        Long mapId = 1L;

        CategoryRequest categoryRequest = new CategoryRequest(categoryName, color);

        given(this.specification).filter(document(DEFAULT_RESTDOC_PATH, MAP_PATH_PARAMETER, CREATE_UPDATE_REQUEST_FIELDS, CREATE_RESPONSE_FIELDS, AUTHORIZATION_HEADER))
                .accept(ContentType.JSON)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .header(HttpHeaders.AUTHORIZATION, this.createAuthorizationHeader(memberId))
                .pathParam("map_id", mapId)
                .body(categoryRequest)
                .log().all()

        .when().post("/map/{map_id}/categories")

        .then().statusCode(HttpStatus.CREATED.value())
                .body("code", equalTo(SuccessCode.CATEGORY_CREATE.getCode()))
                .body("data.category_id", notNullValue());
    }

    private final static Snippet CATEGORY_PATH_PARAMETERS = pathParameters(
            parameterWithName("map_id").description("지도의 아이디"),
            parameterWithName("category_id").description("카테고리의 아이디")
    );

    private final static Snippet READ_RESPONSE_FIELDS = generateCommonResponse(
            fieldWithPath(makeFieldName("category_id")).type(JsonFieldType.NUMBER).description("카테고리의 아이디"),
            fieldWithPath(makeFieldName("category_name")).type(JsonFieldType.STRING).description("카테고리의 이름"),
            fieldWithPath(makeFieldName("category_color")).type(JsonFieldType.STRING).description("카테고리의 색상")
    );

    @Test
    @DisplayName("로그인한 유저 중 지도에 권한이 있는 유저라면 카테고리를 조회할 수 있다.")
    void readOneTest() {

        Long categoryId = 1L;
        Long mapId = 1L;

        given(this.specification).filter(document(DEFAULT_RESTDOC_PATH, AUTHORIZATION_HEADER,
                        CATEGORY_PATH_PARAMETERS, READ_RESPONSE_FIELDS))
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .contentType(ContentType.JSON)
                .pathParam("map_id", mapId)
                .pathParam("category_id", categoryId)
                .header(HttpHeaders.AUTHORIZATION, this.createAuthorizationHeader(1L))
                .log().all()

        .when().get("/map/{map_id}/categories/{category_id}")

        .then().statusCode(HttpStatus.OK.value())
                .body("code", equalTo(SuccessCode.CATEGORY_READ.getCode()))
                .body("data.category_id", equalTo(categoryId.intValue()))
                .body("data.category_name", notNullValue())
                .body("data.category_color", notNullValue())
                .log().all();
    }


    private static final Snippet READ_ALL_CATEGORIES_IN_MAP_RESPONSE_FIELDS = generateCommonResponse(
            fieldWithPath(makeFieldName("[].category_id")).type(JsonFieldType.NUMBER).description("카테고리 아이디"),
            fieldWithPath(makeFieldName("[].category_name")).type(JsonFieldType.STRING).description("카테고리 이름"),
            fieldWithPath(makeFieldName("[].category_color")).type(JsonFieldType.STRING).description("카테고리 색상")
    );

    @Test
    @DisplayName("로그인 한 유저 중 권한이 있는 지도라면, 지도에 포함된 모든 카테고리를 조회할 수 있다.")
    void ReadCategoriesInOneMapTest() {
        Long mapId = 1L;

        given(this.specification).filter(document(DEFAULT_RESTDOC_PATH, AUTHORIZATION_HEADER,
                        MAP_PATH_PARAMETER, READ_ALL_CATEGORIES_IN_MAP_RESPONSE_FIELDS))
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .contentType(ContentType.JSON)
                .pathParam("map_id", mapId)
                .header(HttpHeaders.AUTHORIZATION, this.createAuthorizationHeader(1L))
                .log().all()

        .when().get("/map/{map_id}/categories")

        .then().body("code", equalTo(SuccessCode.CATEGORY_READ_ALL.getCode()))
                .log().all();

    }

    private static final Snippet UPDATE_RESPONSE_FIELDS = generateCommonResponse(
            fieldWithPath(makeFieldName("category_id")).type(JsonFieldType.NUMBER).description("업데이트된 카테고리 아이디"),
            fieldWithPath(makeFieldName("category_name")).type(JsonFieldType.STRING).description("업데이트된 카테고리 이름"),
            fieldWithPath(makeFieldName("category_color")).type(JsonFieldType.STRING).description("업데이트된 카테고리 색상")
    );
    @Test
    @DisplayName("로그인한 유저가 권한이 있는 카테고리를 수정하면 200 OK를 반환한다.")
    void updateTest() {
        Long mapId = 1L;
        Long categoryId = 1L;
        CategoryRequest categoryRequest = new CategoryRequest("categoryName", "color");
        given(this.specification).filter(document(DEFAULT_RESTDOC_PATH, AUTHORIZATION_HEADER, CATEGORY_PATH_PARAMETERS, CREATE_UPDATE_REQUEST_FIELDS, UPDATE_RESPONSE_FIELDS))
                .accept(ContentType.JSON)
                .contentType(ContentType.JSON)
                .header(HttpHeaders.AUTHORIZATION, this.createAuthorizationHeader(1L))
                .body(categoryRequest)
                .pathParam("map_id", mapId)
                .pathParam("category_id", categoryId)

        .when().put("/map/{map_id}/categories/{category_id}")

        .then().statusCode(HttpStatus.OK.value())
                .body("code", equalTo(SuccessCode.CATEGORY_UPDATE.getCode()))
                .body("data.category_name", equalTo(categoryRequest.getCategoryName()))
                .body("data.category_color", equalTo(categoryRequest.getCategoryColor()));


    }

    private static final Snippet DELETE_RESPONSE_FIELDS = generateCommonResponse();

    @Test
    @DisplayName("로그인한 유저가 권한이 있는 카테고리를 삭제하면 200 OK를 반환한다.")
    void deleteCategoryTest() {
        Long mapId = 1L;
        Long categoryId = 2L;

        given(this.specification).filter(document(DEFAULT_RESTDOC_PATH, AUTHORIZATION_HEADER, CATEGORY_PATH_PARAMETERS, DELETE_RESPONSE_FIELDS))
                .accept(ContentType.JSON)
                .contentType(ContentType.JSON)
                .header(HttpHeaders.AUTHORIZATION, this.createAuthorizationHeader(1L))
                .pathParam("map_id", mapId)
                .pathParam("category_id", categoryId)

        .when().delete("/map/{map_id}/categories/{category_id}")

        .then().statusCode(HttpStatus.OK.value())
                .body("code", equalTo(SuccessCode.CATEGORY_DELETE.getCode()));

    }

}
