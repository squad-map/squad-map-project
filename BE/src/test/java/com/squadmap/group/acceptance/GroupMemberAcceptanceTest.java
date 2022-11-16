package com.squadmap.group.acceptance;

import com.squadmap.assured.RestAssuredTest;
import com.squadmap.group.ui.dto.GroupMemberDeleteRequest;
import com.squadmap.group.ui.dto.GroupMemberRequest;
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
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.restdocs.restassured3.RestAssuredRestDocumentation.document;

@ActiveProfiles("test")
public class GroupMemberAcceptanceTest extends RestAssuredTest {


    // group member 조회
    private final static Snippet GROUP_MAP_REQUEST_PATH_PARAMETER = pathParameters(
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

        given(this.specification).filter(document(DEFAULT_RESTDOC_PATH, AUTHORIZATION_HEADER, GROUP_MAP_REQUEST_PATH_PARAMETER, SEARCH_GROUP_IN_MAP_RESPONSE_FIELDS))
                .accept(ContentType.JSON)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .header(HttpHeaders.AUTHORIZATION, this.createAuthorizationHeader(memberId))
                .pathParam("map_id", mapId)

        .when().get("/groups/{map_id}", mapId)

        .then().statusCode(HttpStatus.OK.value())
                .log().all();

    }

    private final static Snippet GROUP_MEMBER_CREATE_OR_UPDATE_REQUEST_FIELDS = requestFields(
            fieldWithPath("member_id").type(JsonFieldType.NUMBER).description("멤버의 아이디"),
            fieldWithPath("permission_level").type(JsonFieldType.STRING).description("접근 권한 ('READ', 'MAINTAIN')")
    );

    @Test
    @DisplayName("지도의 주인(HOST 권한) 사용자는 그룹에 사용자를 추가할 수 있다.")
    void addGroupMemberTest() {
        Long memberId = 1L;
        Long mapId = 1L;

        Long addMemberId = 4L;
        String permissionLevel = "READ";

        GroupMemberRequest addMemberRequest = new GroupMemberRequest(addMemberId, permissionLevel);
        given(this.specification).filter(document(DEFAULT_RESTDOC_PATH, AUTHORIZATION_HEADER, GROUP_MAP_REQUEST_PATH_PARAMETER, GROUP_MEMBER_CREATE_OR_UPDATE_REQUEST_FIELDS))
                .accept(ContentType.JSON)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .header(HttpHeaders.AUTHORIZATION, this.createAuthorizationHeader(memberId))
                .pathParam("map_id", mapId)
                .body(addMemberRequest)

        .when().post("/groups/{map_id}")

        .then().statusCode(HttpStatus.OK.value())
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
        given(this.specification).filter(document(DEFAULT_RESTDOC_PATH, AUTHORIZATION_HEADER, GROUP_MAP_REQUEST_PATH_PARAMETER, GROUP_MEMBER_CREATE_OR_UPDATE_REQUEST_FIELDS))
                .accept(ContentType.JSON)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .header(HttpHeaders.AUTHORIZATION, this.createAuthorizationHeader(memberId))
                .pathParam("map_id", mapId)
                .body(updateRequest)

        .when().put("/groups/{map_id}")

        .then().statusCode(HttpStatus.OK.value())
                .log().all();
    }

    private static final Snippet GROUP_MEMBER_DELETE_REQUEST = requestFields(
            fieldWithPath("member_id").type(JsonFieldType.NUMBER).description("그룹에서 삭제할 멤버의 아이디")
    );
    // group member 삭제
    @Test
    @DisplayName("지도의 주인(HOST 권한)을 가진 사용자는 그룹 내 사용자를 삭제할 수 있다. (+ 본인을 지도 그룹에서 제거할 수 있다.)")
    void deleteGroupMemberTest() {
        Long loginMemberId = 1L;
        Long mapId = 1L;

        Long deleteMemberId = 3L;

        GroupMemberDeleteRequest groupMemberDeleteRequest = new GroupMemberDeleteRequest(deleteMemberId);

        given(this.specification).filter(document(DEFAULT_RESTDOC_PATH, AUTHORIZATION_HEADER, GROUP_MAP_REQUEST_PATH_PARAMETER, GROUP_MEMBER_DELETE_REQUEST))
                .accept(ContentType.JSON)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .header(HttpHeaders.AUTHORIZATION, this.createAuthorizationHeader(loginMemberId))
                .pathParam("map_id", mapId)
                .body(groupMemberDeleteRequest)

        .when().delete("/groups/{map_id}")

        .then().statusCode(HttpStatus.OK.value())
                .log().all();
    }



}
