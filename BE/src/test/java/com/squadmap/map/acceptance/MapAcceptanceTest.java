package com.squadmap.map.acceptance;

import com.squadmap.assured.RestAssuredTest;
import com.squadmap.map.ui.dto.MapRequest;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.restdocs.snippet.Snippet;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.restdocs.restassured3.RestAssuredRestDocumentation.document;

class MapAcceptanceTest extends RestAssuredTest {

    /*
      Map Create Request
      Name : String
      isPrivate : boolean
     */
    private static final Snippet CREATE_REQUEST_FIELDS = requestFields(
            fieldWithPath("map_name").type(JsonFieldType.STRING).description("아이디"),
            fieldWithPath("full_disclosure").type(JsonFieldType.BOOLEAN).description("접근 권한")
    );

    private static final Snippet CREATE_RESPONSE_FIELDS = responseFields(
            fieldWithPath("map_id").type(JsonFieldType.NUMBER).description("아이디")
    );

    @Test
    @DisplayName("정상적인 지도 생성 요청이라면, 생성된 지도 식별자와 상태코드 201을 반환한다.")
    void mapCreateTest() {
        String accessToken = jwtProvider.generateAccessToken(1L);

        MapRequest mapCreateRequest = new MapRequest("first map", false);

        given(this.specification)
                .filter(document(DEFAULT_RESTDOC_PATH, CREATE_REQUEST_FIELDS, CREATE_RESPONSE_FIELDS, AUTHORIZATION_HEADER))
                .accept(ContentType.JSON)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .body(mapCreateRequest)
                .log().all(true)

        .when().post("/map")

        .then().statusCode(HttpStatus.CREATED.value())
                .body("map_id", equalTo(3));

    }

    private static final Snippet UPDATE_REQUEST_FIELDS = requestFields(
            fieldWithPath("map_name").type(JsonFieldType.STRING).description("아이디"),
            fieldWithPath("full_disclosure").type(JsonFieldType.BOOLEAN).description("접근 권한")
    );

    private static final Snippet UPDATE_REQUEST_PATH_VARIABLE = pathParameters(
            parameterWithName("map_id").description("지도의 아이디"));

    @Test
    @DisplayName("정상적인 지도 업데이트 요청이라면, 상태코드 200을 반환한다.")
    void mapUpdateTest() {
        String accessToken = jwtProvider.generateAccessToken(1L);
        Long mapId = 1L;
        Boolean isPrivate = true;
        String mapName = "changed map";


        MapRequest mapUpdateRequest = new MapRequest(mapName, isPrivate);

        given(this.specification)
                .filter(document(DEFAULT_RESTDOC_PATH, UPDATE_REQUEST_FIELDS, AUTHORIZATION_HEADER, UPDATE_REQUEST_PATH_VARIABLE))
                .accept(ContentType.JSON)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .body(mapUpdateRequest)
                .log().all(true)

        .when().post("/map/{map_id}", 1)

        .then().statusCode(HttpStatus.OK.value());

    }
//page=0&size=3
    private static final Snippet READ_MAP_LIST_REQUSET = pathParameters(
            parameterWithName("page").optional().description("페이지 번호(default 0)"),
            parameterWithName("size").optional().description("반환받을 지도 갯수(default 10)")
    );

    private static final Snippet READ_MAP_LIST_RESPONSE = responseFields(
            fieldWithPath("content[].id").type(JsonFieldType.NUMBER).description("지도의 아이디"),
            fieldWithPath("content[].map_name").type(JsonFieldType.STRING).description("지도의 이름"),
            fieldWithPath("content[].host_id").type(JsonFieldType.NUMBER).description("지도의 작성자의 닉네임"),
            fieldWithPath("content[].host_nickname").type(JsonFieldType.STRING).description("지도의 작성자의 닉네임"),
            fieldWithPath("content[].places_count").type(JsonFieldType.NUMBER).description("지도내에 등록된 장소의 갯수"),
            fieldWithPath("pageable[].sort").type(JsonFieldType.NUMBER).description("지도내에 등록된 장소의 갯수"),
            fieldWithPath("content[].places_count").type(JsonFieldType.NUMBER).description("지도내에 등록된 장소의 갯수"),
            fieldWithPath("content[].places_count").type(JsonFieldType.NUMBER).description("지도내에 등록된 장소의 갯수"),
            fieldWithPath("content[].places_count").type(JsonFieldType.NUMBER).description("지도내에 등록된 장소의 갯수"),
            fieldWithPath("content[].places_count").type(JsonFieldType.NUMBER).description("지도내에 등록된 장소의 갯수"),
            fieldWithPath("content[].places_count").type(JsonFieldType.NUMBER).description("지도내에 등록된 장소의 갯수")

    );

    @Test
    @DisplayName("전체 지도를 조회할 수 있다.")
    void readPublicMapListTest() {
        given(this.specification).filter(document(DEFAULT_RESTDOC_PATH, READ_MAP_LIST_REQUSET, READ_MAP_LIST_RESPONSE))
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .queryParam("page", 0)
                .queryParam("size", 10)

        .when().get("/map/public")

        .then()
                .statusCode(HttpStatus.OK.value())
                .log().all();
    }




}
