package com.squadmap.place.acceptance;

import com.squadmap.assured.RestAssuredTest;
import com.squadmap.place.ui.dto.PlaceRequest;
import com.squadmap.place.ui.dto.Point;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.restdocs.snippet.Snippet;

import java.awt.*;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.notNullValue;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.restassured3.RestAssuredRestDocumentation.document;

class PlaceAcceptanceTest extends RestAssuredTest {

    /*
      place Create Request
      name : String
      Position(x, y) : Double
      description : Double
      mapId : Long
      categoryId : Long
     */
    private static final Snippet CREATE_REQUEST_FIELDS = requestFields(
            fieldWithPath("name").type(JsonFieldType.STRING).description("장소 이름"),
            fieldWithPath("address").type(JsonFieldType.STRING).description("장소 주소"),
            fieldWithPath("position.x").type(JsonFieldType.NUMBER).description("장소 위도"),
            fieldWithPath("position.y").type(JsonFieldType.NUMBER).description("장소 경도"),
            fieldWithPath("description").type(JsonFieldType.STRING).description("장소에 대한 설명(리뷰)"),
            fieldWithPath("map_id").type(JsonFieldType.NUMBER).description("장소를 등록할 지도의 아이디"),
            fieldWithPath("category_id").type(JsonFieldType.NUMBER).description("장소를 등록할 카테고리의 아이디")
    );

    private static final Snippet CREATE_RESPONSE_FIELDS = responseFields(
            fieldWithPath("place_id").type(JsonFieldType.NUMBER).description("장소 아이디")
    );

    @Test
    void createTest() {
        String placeName = "my favorite place";
        String address = "관악구";
        double x = 37.123513;
        double y = 127.123414123;
        String description = "it's my favorite place\nthank you";
        Long mapId = 1L;
        Long categoryId = 1L;
        Point point = new Point(x, y);
        String tokenHeader = "Bearer " + jwtProvider.generateAccessToken(1L);
        PlaceRequest placeRequest = new PlaceRequest(placeName, address, point, description, mapId, categoryId);

        given(this.specification).filter(document(DEFAULT_RESTDOC_PATH, CREATE_REQUEST_FIELDS, CREATE_RESPONSE_FIELDS, AUTHORIZATION_HEADER))
                .accept(ContentType.JSON)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .header(HttpHeaders.AUTHORIZATION, tokenHeader)
                .body(placeRequest)
                .log().all()

        .when().post("/places")

        .then().statusCode(HttpStatus.CREATED.value())
                .body("place_id", notNullValue());

    }
}
