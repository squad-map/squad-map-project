package com.squadmap.place.acceptance;

import com.squadmap.assured.RestAssuredTest;
import com.squadmap.place.ui.dto.PlaceRequest;
import com.squadmap.place.ui.dto.PlaceUpdateRequest;
import com.squadmap.place.ui.dto.Point;
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
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
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
            fieldWithPath("detail_link").type(JsonFieldType.STRING).description("장소에 대한 링크"),
            fieldWithPath("map_id").type(JsonFieldType.NUMBER).description("장소를 등록할 지도의 아이디"),
            fieldWithPath("category_id").type(JsonFieldType.NUMBER).optional().description("기존 카테고리 사용시, 장소를 등록할 카테고리의 아이디"),
            fieldWithPath("category_name").type(JsonFieldType.STRING).optional().description("신규 카테고리를 만들시, 장소를 등록할 (신규)카테고리의 이름"),
            fieldWithPath("category_color").type(JsonFieldType.STRING).optional().description("신규 카테고리를 만들시, 장소를 등록할 (신규)카테고리의 색상")
    );

    private static final Snippet CREATE_RESPONSE_FIELDS = responseFields(
            fieldWithPath("place_id").type(JsonFieldType.NUMBER).description("장소 아이디")
    );

    @Test
    @DisplayName("지도에 권한이 있는 사용자는 지도에 장소를 등록할 수 있다.")
    void createTest() {
        String placeName = "my favorite place";
        String address = "관악구";
        double x = 37.123513;
        double y = 127.123414123;
        String description = "it's my favorite place\nthank you";
        String detailLink = "https://kakaomap";
        Long mapId = 1L;
        Long categoryId = 1L;
        Point point = new Point(x, y);
        String tokenHeader = "Bearer " + jwtProvider.generateAccessToken(1L);
        PlaceRequest placeRequest = new PlaceRequest(placeName, address, point, description, detailLink, mapId, categoryId, null, null);

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

    private static final Snippet UPDATE_REQUEST_FIELDS = requestFields(
            fieldWithPath("place_id").type(JsonFieldType.NUMBER).description("장소 아이디"),
            fieldWithPath("category_id").type(JsonFieldType.NUMBER).description("장소를 포함하는 카테고리 아이디"),
            fieldWithPath("description").type(JsonFieldType.STRING).description("변경할 장소에 대한 설명")
    );

    private static final Snippet UPDATE_RESPONSE_FIELDS = responseFields(
            fieldWithPath("place_id").type(JsonFieldType.NUMBER).description("장소 아이디"),
            fieldWithPath("place_name").type(JsonFieldType.STRING).description("장소 이름"),
            fieldWithPath("address").type(JsonFieldType.STRING).description("장소 주소"),
            fieldWithPath("latitude").type(JsonFieldType.NUMBER).description("장소 위도"),
            fieldWithPath("longitude").type(JsonFieldType.NUMBER).description("장소 경도"),
            fieldWithPath("description").type(JsonFieldType.STRING).description("(수정된)장소 설명"),
            fieldWithPath("detail_link").type(JsonFieldType.STRING).description("장소에 대한 링크"),
            fieldWithPath("category_id").type(JsonFieldType.NUMBER).description("(수정된)카테고리의 아이디")
        );

    @Test
    @DisplayName("지도에 권한이 있는 사용자는 지도에 등록된 장소의 설명, 카테고리를 수정할 수 있다.")
    void updateTest() {
        Long placeId = 1L;
        Long categoryId = 2L;
        String description = "updated description";

        PlaceUpdateRequest placeUpdateRequest = new PlaceUpdateRequest(placeId, categoryId, description);

        given(this.specification).filter(document(DEFAULT_RESTDOC_PATH, AUTHORIZATION_HEADER, UPDATE_REQUEST_FIELDS, UPDATE_RESPONSE_FIELDS))
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .contentType(ContentType.JSON)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + jwtProvider.generateAccessToken(1L))
                .body(placeUpdateRequest)
                .log().all()

        .when().post("/places/update")

        .then().statusCode(HttpStatus.OK.value())
                .body("place_id", equalTo(placeId.intValue()))
                .body("category_id", equalTo(categoryId.intValue()))
                .body("description", equalTo(description))
                .log().all();
    }


    private static final Snippet READ_PATH_PARAMETER = pathParameters(
            parameterWithName("place_id").description("조회할 장소의 아이디")
    );

    private static final Snippet READ_ONE_RESPONSE_FIELDS = responseFields(
            fieldWithPath("place_id").type(JsonFieldType.NUMBER).description("장소 아이디"),
            fieldWithPath("place_name").type(JsonFieldType.STRING).description("장소 이름"),
            fieldWithPath("address").type(JsonFieldType.STRING).description("장소 주소"),
            fieldWithPath("latitude").type(JsonFieldType.NUMBER).description("장소 위도"),
            fieldWithPath("longitude").type(JsonFieldType.NUMBER).description("장소 경도"),
            fieldWithPath("description").type(JsonFieldType.STRING).description("장소 설명"),
            fieldWithPath("detail_link").type(JsonFieldType.STRING).description("장소에 대한 링크"),
            fieldWithPath("category_id").type(JsonFieldType.NUMBER).description("카테고리의 아이디")
    );

    @Test
    @DisplayName("지도에 권한이 있는 사용자는 지도에 등록된 장소를 조회할 수 있다.")
    void readOneTest() {

        Long placeId = 1L;
        given(this.specification).filter(document(DEFAULT_RESTDOC_PATH, AUTHORIZATION_HEADER, READ_PATH_PARAMETER, READ_ONE_RESPONSE_FIELDS))
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .contentType(ContentType.JSON)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + jwtProvider.generateAccessToken(1L))
                .pathParam("place_id", placeId)
                .log().all()

        .when().get("/places/{place_id}",placeId)

        .then().statusCode(HttpStatus.OK.value())
                .body("place_id", notNullValue())
                .body("place_name", notNullValue())
                .body("address", notNullValue())
                .body("latitude", notNullValue())
                .body("longitude", notNullValue())
                .body("category_id", notNullValue())
                .body("description", notNullValue())
                .log().all();

    }

}
