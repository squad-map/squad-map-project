package com.squadmap.map.acceptance;

import com.squadmap.assured.RestAssuredTest;
import com.squadmap.common.dto.SuccessCode;
import com.squadmap.core.map.ui.dto.MapRequest;
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

class MapAcceptanceTest extends RestAssuredTest {

    private static final Snippet CREATE_REQUEST_FIELDS = requestFields(
            fieldWithPath("map_name").type(JsonFieldType.STRING).description("아이디"),
            fieldWithPath("map_emoji").type(JsonFieldType.STRING).description("이모지"),
            fieldWithPath("full_disclosure").type(JsonFieldType.BOOLEAN).description("접근 권한")
    );

    private static final Snippet CREATE_RESPONSE_FIELDS = responseFields(
            fieldWithPath(makeFieldName("map_id")).type(JsonFieldType.NUMBER).description("아이디")
    );

    @Test
    @DisplayName("정상적인 지도 생성 요청이라면, 생성된 지도 식별자와 상태코드 201을 반환한다.")
    void mapCreateTest() {
        String accessToken = jwtProvider.generateAccessToken(1L);

        MapRequest mapCreateRequest = new MapRequest("first map", "U+1F600",false);

        given(this.specification)
                .filter(document(DEFAULT_RESTDOC_PATH, CREATE_REQUEST_FIELDS,
                        COMMON_RESPONSE_FIELDS, CREATE_RESPONSE_FIELDS, AUTHORIZATION_HEADER))
                .accept(ContentType.JSON)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .body(mapCreateRequest)
                .log().all(true)

        .when().post("/map")

        .then().statusCode(HttpStatus.CREATED.value())
                .body("code", equalTo(SuccessCode.MAP_CREATE.getCode()))
                .body("map_id", notNullValue());

    }

    private static final Snippet UPDATE_REQUEST_FIELDS = requestFields(
            fieldWithPath("map_name").type(JsonFieldType.STRING).description("아이디"),
            fieldWithPath("map_emoji").type(JsonFieldType.STRING).description("이모지"),
            fieldWithPath("full_disclosure").type(JsonFieldType.BOOLEAN).description("접근 권한")
    );


    private static final Snippet UPDATE_RESPONSE_FIELDS = responseFields(
            fieldWithPath(makeFieldName("map_id")).type(JsonFieldType.NUMBER).description("업데이트 된 지도의 아이디"),
            fieldWithPath(makeFieldName("map_name")).type(JsonFieldType.STRING).description("업데이트 된 지도의 이름"),
            fieldWithPath(makeFieldName("map_emoji")).type(JsonFieldType.STRING).description("업데이트 된 지도의 이모지"),
            fieldWithPath(makeFieldName("full_disclosure")).type(JsonFieldType.BOOLEAN).description("업데이트 된 지도의 공개 범위")
    );


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
                .filter(document(DEFAULT_RESTDOC_PATH, UPDATE_REQUEST_FIELDS, AUTHORIZATION_HEADER,
                        MAP_PATH_PARAMETER, COMMON_RESPONSE_FIELDS, UPDATE_RESPONSE_FIELDS))
                .accept(ContentType.JSON)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .body(mapUpdateRequest)
                .log().all(true)

        .when().put("/map/{map_id}", mapId)

        .then().statusCode(HttpStatus.OK.value())
                .body("code", equalTo(SuccessCode.MAP_UPDATE.getCode()))
                .log().all();

    }

    private static final Snippet READ_MAP_LIST_REQUEST = requestParameters(
            parameterWithName("page").optional().description("페이지 번호(default 0)"),
            parameterWithName("size").optional().description("반환받을 지도 갯수(default 10)"),
            parameterWithName("name").optional().description("검색하고자 하는 지도 이름 (값을 넣어주지 않으면 전체 지도 검색)")
    );

    private static final Snippet READ_MAP_LIST_RESPONSE = responseFields(
            fieldWithPath(makeFieldName("content[].id")).type(JsonFieldType.NUMBER).description("지도의 아이디"),
            fieldWithPath(makeFieldName("content[].map_name")).type(JsonFieldType.STRING).description("지도의 이름"),
            fieldWithPath(makeFieldName("content[].map_emoji")).type(JsonFieldType.STRING).description("지도의 이모지"),
            fieldWithPath(makeFieldName("content[].host_id")).type(JsonFieldType.NUMBER).description("지도 작성자의 아이디"),
            fieldWithPath(makeFieldName("content[].host_nickname")).type(JsonFieldType.STRING).description("지도 작성자의 닉네임"),
            fieldWithPath(makeFieldName("content[].host_profile_image")).type(JsonFieldType.STRING).description("지도 작성자의 프로필 이미지"),
            fieldWithPath(makeFieldName("content[].places_count")).type(JsonFieldType.NUMBER).description("지도내에 등록된 장소의 갯수"),
            fieldWithPath(makeFieldName("page_number")).type(JsonFieldType.NUMBER).description("페이지 넘버"),
            fieldWithPath(makeFieldName("size")).type(JsonFieldType.NUMBER).description("요청 데이터 갯수"),
            fieldWithPath(makeFieldName("total_pages")).type(JsonFieldType.NUMBER).description("총 페이지 갯수"),
            fieldWithPath(makeFieldName("total_elements")).type(JsonFieldType.NUMBER).description("총 데이터 수"),
            fieldWithPath(makeFieldName("first")).type(JsonFieldType.BOOLEAN).description("첫 페이지 여부"),
            fieldWithPath(makeFieldName("last")).type(JsonFieldType.BOOLEAN).description("마지막 페이지 여부")
    );

    @Test
    @DisplayName("전체 지도를 조회할 수 있다.")
    void readPublicMapListTest() {
        given(this.specification).filter(document(DEFAULT_RESTDOC_PATH, READ_MAP_LIST_REQUEST,
                        COMMON_RESPONSE_FIELDS, READ_MAP_LIST_RESPONSE))
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .queryParam("page", 0)
                .queryParam("size", 10)

        .when().get("/map/public")

        .then()
                .statusCode(HttpStatus.OK.value())
                .body("code", equalTo(SuccessCode.MAP_READ_PUB.getCode()))
                .body("page_number" , equalTo(0))
                .body("size" , equalTo(10))
                .log().all();
    }

    private static final Snippet READ_MAP_DETAIL_REQUEST_PATH_PARAMETER = pathParameters(
            parameterWithName("map_id").description("조회할 지도의 아이디")
    );

    private static final Snippet READ_MAP_DETAIL_RESPONSE = responseFields(
            fieldWithPath(makeFieldName("map_id")).type(JsonFieldType.NUMBER).description("지도의 아이디"),
            fieldWithPath(makeFieldName("map_name")).type(JsonFieldType.STRING).description("지도의 이름"),
            fieldWithPath(makeFieldName("map_emoji")).type(JsonFieldType.STRING).description("지도의 이모지"),
            fieldWithPath(makeFieldName("host_id")).type(JsonFieldType.NUMBER).description("지도 작성자의 아이디"),
            fieldWithPath(makeFieldName("host_nickname")).type(JsonFieldType.STRING).description("지도 작성자의 닉네임"),
            fieldWithPath(makeFieldName("host_profile_image")).type(JsonFieldType.STRING).description("지도 작성자의 닉네임"),
            fieldWithPath(makeFieldName("places_count")).type(JsonFieldType.NUMBER).description("지도내에 등록된 장소의 갯수"),
            fieldWithPath(makeFieldName("categorized_places[].category_info.category_id")).type(JsonFieldType.NUMBER).description("카테고리 아이디"),
            fieldWithPath(makeFieldName("categorized_places[].category_info.category_name")).type(JsonFieldType.STRING).description("카테고리 이름"),
            fieldWithPath(makeFieldName("categorized_places[].category_info.category_color")).type(JsonFieldType.STRING).description("카테고리 색상"),
            fieldWithPath(makeFieldName("categorized_places[].places[].place_id")).type(JsonFieldType.NUMBER).description("장소 아이디"),
            fieldWithPath(makeFieldName("categorized_places[].places[].place_name")).type(JsonFieldType.STRING).description("장소 이름"),
            fieldWithPath(makeFieldName("categorized_places[].places[].address")).type(JsonFieldType.STRING).description("장소 주소"),
            fieldWithPath(makeFieldName("categorized_places[].places[].latitude")).type(JsonFieldType.NUMBER).description("장소 위도"),
            fieldWithPath(makeFieldName("categorized_places[].places[].longitude")).type(JsonFieldType.NUMBER).description("장소 경도")
    );

    @Test
    @DisplayName("로그인한 유저는 지도를 조회할 수 있다.")
    void readMapDetail() {
        given(this.specification).filter(document(DEFAULT_RESTDOC_PATH, READ_MAP_DETAIL_REQUEST_PATH_PARAMETER, AUTHORIZATION_HEADER,
                        COMMON_RESPONSE_FIELDS, READ_MAP_DETAIL_RESPONSE))
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .header(HttpHeaders.AUTHORIZATION, this.createAuthorizationHeader(1L))

                .when().get("/map/{map_id}", 1L)

                .then().statusCode(HttpStatus.OK.value())
                        .body("code", equalTo(SuccessCode.MAP_READ_DETAIL.getCode()))
                        .log().all();
    }

    private static final Snippet SEARCH_GROUP_MAP_LIST_REQUEST_PARAMS = requestParameters(
            parameterWithName("name").optional().description("검색하고자하는 그룹 지도 이름 (값을 넣어주지 않으면 속한 그룹지도 전체검색) ")
    );

    private static final Snippet READ_GROUP_MAP_LIST_RESPONSE = responseFields(
            fieldWithPath(makeFieldName("map_count")).type(JsonFieldType.NUMBER).description("속한 그룹 지도의 갯수"),
            fieldWithPath(makeFieldName("content[].id")).type(JsonFieldType.NUMBER).description("지도의 아이디"),
            fieldWithPath(makeFieldName("content[].map_name")).type(JsonFieldType.STRING).description("지도의 이름"),
            fieldWithPath(makeFieldName("content[].map_emoji")).type(JsonFieldType.STRING).description("지도의 이모지"),
            fieldWithPath(makeFieldName("content[].host_id")).type(JsonFieldType.NUMBER).description("지도의 작성자의 닉네임"),
            fieldWithPath(makeFieldName("content[].host_nickname")).type(JsonFieldType.STRING).description("지도의 작성자의 닉네임"),
            fieldWithPath(makeFieldName("content[].host_profile_image")).type(JsonFieldType.STRING).description("지도의 작성자의 프로필 이미지"),
            fieldWithPath(makeFieldName("content[].places_count")).type(JsonFieldType.NUMBER).description("지도내에 등록된 장소의 갯수")
    );

    @Test
    @DisplayName("로그인한 유저라면 그룹 혹은 자신이 만든 지도의 리스트를 조회할 수 있다.")
    void readGroupMapsTest() {

        given(this.specification).filter(document(DEFAULT_RESTDOC_PATH, AUTHORIZATION_HEADER, SEARCH_GROUP_MAP_LIST_REQUEST_PARAMS,
                        COMMON_RESPONSE_FIELDS, READ_GROUP_MAP_LIST_RESPONSE))
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .contentType(ContentType.JSON)
                .header(HttpHeaders.AUTHORIZATION, this.createAuthorizationHeader(1L))
                .log().all()

        .when().get("/map/group")

        .then().statusCode(HttpStatus.OK.value())
                .body("code", equalTo(SuccessCode.MAP_READ_PRI.getCode()))
                .body("map_count", notNullValue())
                .log().all();
    }












}
