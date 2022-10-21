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

    private static final Snippet CREATE_REQUEST_FIELDS = requestFields(
            fieldWithPath("map_name").type(JsonFieldType.STRING).description("아이디"),
            fieldWithPath("emoji").type(JsonFieldType.STRING).description("이모지"),
            fieldWithPath("full_disclosure").type(JsonFieldType.BOOLEAN).description("접근 권한")
    );

    private static final Snippet CREATE_RESPONSE_FIELDS = responseFields(
            fieldWithPath("map_id").type(JsonFieldType.NUMBER).description("아이디")
    );

    @Test
    @DisplayName("정상적인 지도 생성 요청이라면, 생성된 지도 식별자와 상태코드 201을 반환한다.")
    void mapCreateTest() {
        String accessToken = jwtProvider.generateAccessToken(1L);

        MapRequest mapCreateRequest = new MapRequest("first map", "U+1F600",false);

        given(this.specification)
                .filter(document(DEFAULT_RESTDOC_PATH, CREATE_REQUEST_FIELDS, CREATE_RESPONSE_FIELDS, AUTHORIZATION_HEADER))
                .accept(ContentType.JSON)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .body(mapCreateRequest)
                .log().all(true)

        .when().post("/map")

        .then().statusCode(HttpStatus.CREATED.value())
                .body("map_id", notNullValue());

    }

    private static final Snippet UPDATE_REQUEST_FIELDS = requestFields(
            fieldWithPath("map_name").type(JsonFieldType.STRING).description("아이디"),
            fieldWithPath("emoji").type(JsonFieldType.STRING).description("이모지"),
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
        String emoji = "U+1F600";


        MapRequest mapUpdateRequest = new MapRequest(mapName, emoji, isPrivate);

        given(this.specification)
                .filter(document(DEFAULT_RESTDOC_PATH, UPDATE_REQUEST_FIELDS, AUTHORIZATION_HEADER, UPDATE_REQUEST_PATH_VARIABLE))
                .accept(ContentType.JSON)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .body(mapUpdateRequest)
                .log().all(true)

        .when().post("/map/{map_id}", mapId)

        .then().statusCode(HttpStatus.OK.value());

    }

    private static final Snippet READ_MAP_LIST_REQUSET = pathParameters(
            parameterWithName("page").optional().description("페이지 번호(default 0)"),
            parameterWithName("size").optional().description("반환받을 지도 갯수(default 10)")
    );

    private static final Snippet READ_MAP_LIST_RESPONSE = responseFields(
            fieldWithPath("content[].id").type(JsonFieldType.NUMBER).description("지도의 아이디"),
            fieldWithPath("content[].map_name").type(JsonFieldType.STRING).description("지도의 이름"),
            fieldWithPath("content[].map_emoji").type(JsonFieldType.STRING).description("지도의 이모지"),
            fieldWithPath("content[].host_id").type(JsonFieldType.NUMBER).description("지도 작성자의 아이디"),
            fieldWithPath("content[].host_nickname").type(JsonFieldType.STRING).description("지도 작성자의 닉네임"),
            fieldWithPath("content[].places_count").type(JsonFieldType.NUMBER).description("지도내에 등록된 장소의 갯수"),
            fieldWithPath("page_number").type(JsonFieldType.NUMBER).description("페이지 넘버"),
            fieldWithPath("size").type(JsonFieldType.NUMBER).description("요청 데이터 갯수"),
            fieldWithPath("total_pages").type(JsonFieldType.NUMBER).description("총 페이지 갯수"),
            fieldWithPath("total_elements").type(JsonFieldType.NUMBER).description("총 데이터 수"),
            fieldWithPath("first").type(JsonFieldType.BOOLEAN).description("첫 페이지 여부"),
            fieldWithPath("last").type(JsonFieldType.BOOLEAN).description("마지막 페이지 여부")

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
                .body("page_number" , equalTo(0))
                .body("size" , equalTo(10))
                .log().all();
    }

    private static final Snippet READ_MAP_DETAIL_REQUEST_PATH_PARAMETER = pathParameters(
            parameterWithName("map_id").description("조회할 지도의 아이디")
    );

    private static final Snippet READ_MAP_DETAIL_RESPONSE = responseFields(
            fieldWithPath("map_id").type(JsonFieldType.NUMBER).description("지도의 아이디"),
            fieldWithPath("map_name").type(JsonFieldType.STRING).description("지도의 이름"),
            fieldWithPath("map_emoji").type(JsonFieldType.STRING).description("지도의 이모지"),
            fieldWithPath("host_id").type(JsonFieldType.NUMBER).description("지도 작성자의 아이디"),
            fieldWithPath("host_nickname").type(JsonFieldType.STRING).description("지도 작성자의 닉네임"),
            fieldWithPath("places_count").type(JsonFieldType.NUMBER).description("지도내에 등록된 장소의 갯수"),
            fieldWithPath("categorized_places[].category_info.category_id").type(JsonFieldType.NUMBER).description("카테고리 아이디"),
            fieldWithPath("categorized_places[].category_info.category_name").type(JsonFieldType.STRING).description("카테고리 이름"),
            fieldWithPath("categorized_places[].category_info.category_color").type(JsonFieldType.STRING).description("카테고리 색상"),
            fieldWithPath("categorized_places[].places[].place_id").type(JsonFieldType.NUMBER).description("장소 아이디"),
            fieldWithPath("categorized_places[].places[].place_name").type(JsonFieldType.STRING).description("장소 이름"),
            fieldWithPath("categorized_places[].places[].address").type(JsonFieldType.STRING).description("장소 주소"),
            fieldWithPath("categorized_places[].places[].position.latitude").type(JsonFieldType.NUMBER).description("장소 위도"),
            fieldWithPath("categorized_places[].places[].position.longitude").type(JsonFieldType.NUMBER).description("장소 경도")
    );

    @Test
    @DisplayName("로그인한 유저는 지도를 조회할 수 있다.")
    void readMapDetail() {
        String accessToken = jwtProvider.generateAccessToken(1L);
        given(this.specification).filter(document(DEFAULT_RESTDOC_PATH, READ_MAP_DETAIL_REQUEST_PATH_PARAMETER, AUTHORIZATION_HEADER, READ_MAP_DETAIL_RESPONSE))
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)

                .when().get("/map/{map_id}", 1L)

                .then()
                .statusCode(HttpStatus.OK.value())
                .log().all();
    }

    private static final Snippet READ_GROUP_MAP_LIST_RESPONSE = responseFields(
            fieldWithPath("map_count").type(JsonFieldType.NUMBER).description("속한 그룹 지도의 갯수"),
            fieldWithPath("maps[].id").type(JsonFieldType.NUMBER).description("지도의 아이디"),
            fieldWithPath("maps[].map_name").type(JsonFieldType.STRING).description("지도의 이름"),
            fieldWithPath("maps[].map_emoji").type(JsonFieldType.STRING).description("지도의 이모지"),
            fieldWithPath("maps[].host_id").type(JsonFieldType.NUMBER).description("지도의 작성자의 닉네임"),
            fieldWithPath("maps[].host_nickname").type(JsonFieldType.STRING).description("지도의 작성자의 닉네임"),
            fieldWithPath("maps[].places_count").type(JsonFieldType.NUMBER).description("지도내에 등록된 장소의 갯수")
    );

    @Test
    @DisplayName("로그인한 유저라면 그룹 혹은 자신이 만든 지도의 리스트를 조회할 수 있다.")
    void readGroupMapsTest() {

        given(this.specification).filter(document(DEFAULT_RESTDOC_PATH, AUTHORIZATION_HEADER, READ_GROUP_MAP_LIST_RESPONSE))
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .contentType(ContentType.JSON)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + jwtProvider.generateAccessToken(1L))
                .log().all()

        .when().get("/map/group")

        .then().statusCode(HttpStatus.OK.value())
                .body("map_count", notNullValue())
                .log().all();
    }









}
