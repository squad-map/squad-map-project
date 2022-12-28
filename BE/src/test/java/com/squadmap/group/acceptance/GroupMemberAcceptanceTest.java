package com.squadmap.group.acceptance;

import com.squadmap.assured.RestAssuredTest;
import com.squadmap.common.dto.SuccessCode;
import com.squadmap.core.group.ui.dto.GroupMemberRequest;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.restdocs.snippet.Snippet;
import org.springframework.test.context.ActiveProfiles;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.restdocs.restassured3.RestAssuredRestDocumentation.document;

@ActiveProfiles("test")
public class GroupMemberAcceptanceTest extends RestAssuredTest {


    private final static Snippet SEARCH_GROUP_IN_MAP_RESPONSE_FIELDS = generateCommonResponse(
            fieldWithPath(makeFieldName("[].member_id")).type(JsonFieldType.NUMBER).description("회원의 아이디"),
            fieldWithPath(makeFieldName("[].member_nickname")).type(JsonFieldType.STRING).description("회원의 닉네임"),
            fieldWithPath(makeFieldName("[].member_profile_image")).type(JsonFieldType.STRING).description("회원의 프로필 이미지"),
            fieldWithPath(makeFieldName("[].level")).type(JsonFieldType.STRING).description("회원의 지도 권한")
    );

    @Test
    @DisplayName("지도의 접근 권한이 있는 사용자가 지도 그룹에 속한 회원들을 조회할 수 있다.")
    void searchGroupInMapTest() {
        Long memberId = 1L;
        Long mapId = 1L;

        given(this.specification).filter(document(DEFAULT_RESTDOC_PATH, AUTHORIZATION_HEADER, MAP_PATH_PARAMETER,
                         SEARCH_GROUP_IN_MAP_RESPONSE_FIELDS))
                .accept(ContentType.JSON)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .header(HttpHeaders.AUTHORIZATION, this.createAuthorizationHeader(memberId))
                .pathParam("map_id", mapId)

        .when().get("/map/{map_id}/groups")

        .then().statusCode(HttpStatus.OK.value())
                .body("code", equalTo(SuccessCode.GROUP_READ.getCode()))
                .log().all();

    }

    private static final Snippet GROUP_MEMBER_CREATE_OR_UPDATE_REQUEST_FIELDS = requestFields(
            fieldWithPath("member_id").type(JsonFieldType.NUMBER).description("멤버의 아이디"),
            fieldWithPath("permission_level").type(JsonFieldType.STRING).description("접근 권한 ('READ', 'MAINTAIN')")
    );

    private static final Snippet GROUP_MEMBER_SIMPLE_RESPONSE_FIELDS = generateCommonResponse(
            fieldWithPath(makeFieldName("map_id")).type(JsonFieldType.NUMBER).description("포함된 지도 아이디"),
            fieldWithPath(makeFieldName("member_id")).type(JsonFieldType.NUMBER).description("추가된 멤버의 아이디"),
            fieldWithPath(makeFieldName("level")).description(JsonFieldType.STRING).description("그룹에서의 접근 레벨")
    );

    @Test
    @DisplayName("지도의 주인(HOST 권한) 사용자는 그룹에 사용자를 추가할 수 있다.")
    void addGroupMemberTest() {
        Long memberId = 1L;
        Long mapId = 1L;

        Long addMemberId = 4L;
        String permissionLevel = "READ";

        GroupMemberRequest addMemberRequest = new GroupMemberRequest(addMemberId, permissionLevel);
        given(this.specification).filter(document(DEFAULT_RESTDOC_PATH, AUTHORIZATION_HEADER, MAP_PATH_PARAMETER,
                        GROUP_MEMBER_CREATE_OR_UPDATE_REQUEST_FIELDS, GROUP_MEMBER_SIMPLE_RESPONSE_FIELDS))
                .accept(ContentType.JSON)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .header(HttpHeaders.AUTHORIZATION, this.createAuthorizationHeader(memberId))
                .pathParam("map_id", mapId)
                .body(addMemberRequest)

        .when().post("/map/{map_id}/groups")

        .then().statusCode(HttpStatus.OK.value())
                .body("code", equalTo(SuccessCode.GROUP_CREATE.getCode()))
                .log().all();
    }

    // group member 권한 수정
    @Test
    @DisplayName("지도의 주인(HOST 권한) 사용자는 그룹 내 사용자의 접근 권한을 수정할 수 있다.")
    void updateGroupMemberPermissionTest() {
        Long memberId = 1L;
        Long mapId = 1L;

        Long addMemberId = 2L;
        String permissionLevel = "MAINTAIN";

        GroupMemberRequest updateRequest = new GroupMemberRequest(addMemberId, permissionLevel);
        given(this.specification).filter(document(DEFAULT_RESTDOC_PATH, AUTHORIZATION_HEADER, MAP_PATH_PARAMETER,
                        GROUP_MEMBER_CREATE_OR_UPDATE_REQUEST_FIELDS, GROUP_MEMBER_SIMPLE_RESPONSE_FIELDS))
                .accept(ContentType.JSON)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .header(HttpHeaders.AUTHORIZATION, this.createAuthorizationHeader(memberId))
                .pathParam("map_id", mapId)
                .body(updateRequest)

        .when().put("/map/{map_id}/groups")

        .then().statusCode(HttpStatus.OK.value())
                .body("code", equalTo(SuccessCode.GROUP_UPDATE.getCode()))
                .log().all();
    }

    private static final Snippet GROUP_MEMBER_DELETE_PATH_PARAMETERS = pathParameters(
            parameterWithName("map_id").description("지도의 아이디"),
            parameterWithName("member_id").description("회원의 아이디")
    );

    @Test
    @DisplayName("지도의 주인(HOST 권한)을 가진 로그인 사용자가 그룹멤버를 삭제를 요청하면 삭제 후 200 OK를 반환한다.")
    void deleteGroupMemberTest() {
        Long loginMemberId = 1L;
        Long mapId = 1L;

        Long deleteMemberId = 3L;

        given(this.specification).filter(document(DEFAULT_RESTDOC_PATH, AUTHORIZATION_HEADER,
                        GROUP_MEMBER_DELETE_PATH_PARAMETERS, COMMON_RESPONSE_EMPTY_DATA))
                .accept(ContentType.JSON)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .header(HttpHeaders.AUTHORIZATION, this.createAuthorizationHeader(loginMemberId))
                .pathParam("map_id", mapId)
                .pathParam("member_id", deleteMemberId)

        .when().delete("/map/{map_id}/groups/{member_id}")

        .then().statusCode(HttpStatus.OK.value())
                .body("code", equalTo(SuccessCode.GROUP_DELETE.getCode()))
                .log().all();
    }



}
