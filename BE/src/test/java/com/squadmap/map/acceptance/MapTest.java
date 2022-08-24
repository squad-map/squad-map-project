package com.squadmap.map.acceptance;

import com.squadmap.assured.RestAssuredTest;
import com.squadmap.map.ui.dto.MapCreateRequest;
import io.restassured.http.ContentType;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.restdocs.snippet.Snippet;

import static io.restassured.RestAssured.given;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.restassured3.RestAssuredRestDocumentation.document;

class MapTest extends RestAssuredTest {

    /*
      Map Create Request
      Name : String
      isPrivate : boolean
     */
    private static final Snippet CREATE_REQUEST_FIELDS = requestFields(
            fieldWithPath("mapName").type(JsonFieldType.STRING).description("아이디"),
            fieldWithPath("isPrivate").type(JsonFieldType.BOOLEAN).description("접근 권한")
    );

    private static final Snippet CREATE_RESPONSE_FIELDS = responseFields(
            fieldWithPath("mapId").type(JsonFieldType.NUMBER).description("아이디")
    );

    @Test
    @DisplayName("정상적인 지도 생성 요청이라면, 상태코드 201을 반환한다.")
    void mapCreateTest() {

        String mapName = "Ron2's First Map";
        Boolean isPrivate = false;

        MapCreateRequest mapCreateRequest = new MapCreateRequest("first map", false);

        given(this.specification)
                .filter(document(DEFAULT_RESTDOC_PATH, CREATE_REQUEST_FIELDS, CREATE_RESPONSE_FIELDS))
                .accept(ContentType.JSON)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .body(mapCreateRequest)
                .log().all(true)

        .when().post("/map")

        .then().statusCode(HttpStatus.CREATED.value())
                .body("mapId", Matchers.equalTo(1));

    }

}
