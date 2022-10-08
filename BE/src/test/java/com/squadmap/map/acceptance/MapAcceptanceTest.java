package com.squadmap.map.acceptance;

import com.squadmap.assured.RestAssuredTest;
import com.squadmap.map.ui.dto.MapRequest;
import io.restassured.http.ContentType;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.restdocs.snippet.Snippet;

import static io.restassured.RestAssured.given;
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
                .body("map_id", Matchers.equalTo(3));

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




}
