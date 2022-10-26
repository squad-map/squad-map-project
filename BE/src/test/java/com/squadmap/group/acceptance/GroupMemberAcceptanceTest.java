package com.squadmap.group.acceptance;

import com.squadmap.assured.RestAssuredTest;

import io.restassured.http.ContentType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.restdocs.snippet.Snippet;

import static io.restassured.RestAssured.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.restdocs.restassured3.RestAssuredRestDocumentation.document;

public class GroupMemberAcceptanceTest extends RestAssuredTest {


    // group member 조회
    private final static Snippet SEARCH_GROUP_IN_MAP_REQUEST_PATH_PARAMETER = pathParameters(
            parameterWithName("map_id").description("지도의 아이디")
    );

    private final static Snippet SEARCH_GROUP_IN_MAP_RESPONSE_FIELDS = responseFields(
            fieldWithPath("[].member_id").type(JsonFieldType.NUMBER).description("회원의 아이디"),
            fieldWithPath("[].member_nickname").type(JsonFieldType.STRING).description("회원의 닉네임"),
            fieldWithPath("[].member_profile_image").type(JsonFieldType.STRING).description("회원의 프로필 이미지"),
            fieldWithPath("[].permission_level").type(JsonFieldType.STRING).description("회원의 지도 권한")
    );

    @Test
    @DisplayName("지도의 접근 권한이 있는 사용자가 지도 그룹에 속한 회원들을 조회할 수 있다.")
    void searchGroupInMapTest() {
        Long memberId = 1L;
        Long mapId = 1L;

        given(this.specification).filter(document(DEFAULT_RESTDOC_PATH, SEARCH_GROUP_IN_MAP_REQUEST_PATH_PARAMETER, SEARCH_GROUP_IN_MAP_RESPONSE_FIELDS))
                .accept(ContentType.JSON)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .header(HttpHeaders.AUTHORIZATION, this.createAuthorizationHeader(memberId))
                .pathParam("map_id", mapId)

        .when().get("/groups/{map_id}", mapId)

        .then().statusCode(HttpStatus.OK.value())
                .log().all();

    }


    // group member 추가

    // group member 권한 수정

    // group member 삭제
}
