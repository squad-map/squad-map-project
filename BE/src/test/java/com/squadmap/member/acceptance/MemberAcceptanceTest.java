package com.squadmap.member.acceptance;

import com.squadmap.assured.RestAssuredTest;
import com.squadmap.common.dto.SuccessCode;
import com.squadmap.member.ui.dto.NicknameUpdateRequest;
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
import static org.springframework.restdocs.request.RequestDocumentation.requestParameters;
import static org.springframework.restdocs.restassured3.RestAssuredRestDocumentation.document;

class MemberAcceptanceTest extends RestAssuredTest {


    private static final Snippet NICKNAME_UPDATE_REQUEST_FIELDS = requestFields(
            fieldWithPath("nickname").type(JsonFieldType.STRING).description("수정하고자하는 닉네임")
    );

    private static final Snippet NICKNAME_UPDATE_RESPONSE_FIELDS = generateCommonResponse(
            fieldWithPath(makeFieldName("member_id")).type(JsonFieldType.NUMBER).description("멤버 아이디"),
            fieldWithPath(makeFieldName("nickname")).type(JsonFieldType.STRING).description("수정된 닉네임")
    );

    @Test
    @DisplayName("로그인한 멤버가 닉네임을 수정하고자 했을 때, 수정되면 200 OK를 반환한다.")
    void nicknameUpdateTest() {

        String nickname = "update nickname";
        NicknameUpdateRequest nickNameUpdateRequest = new NicknameUpdateRequest(nickname);
        given(this.specification).filter(document(DEFAULT_RESTDOC_PATH, NICKNAME_UPDATE_REQUEST_FIELDS,
                        NICKNAME_UPDATE_RESPONSE_FIELDS, AUTHORIZATION_HEADER))
                .accept(ContentType.JSON)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .header(HttpHeaders.AUTHORIZATION, this.createAuthorizationHeader(1L))
                .body(nickNameUpdateRequest)
                .log().all()

        .when().patch("/members")

        .then().statusCode(HttpStatus.OK.value())
                .body("code", equalTo(SuccessCode.MEMBER_UPDATE.getCode()))
                .log().all();

    }

    private static final Snippet SEARCH_MEMBER_BY_NICKNAME_REQUEST_PARAMS = requestParameters(
           parameterWithName("nickname").description("찾고자하는 닉네임 검색어")
    );

    private static final Snippet SEARCH_MEMBER_BY_NICKNAME_RESPONSE = generateCommonResponse(
            fieldWithPath(makeFieldName("[].member_id")).type(JsonFieldType.NUMBER).description("멤버 아이디"),
            fieldWithPath(makeFieldName("[].nickname")).type(JsonFieldType.STRING).description("멤버 닉네임"),
            fieldWithPath(makeFieldName("[].profile_image")).type(JsonFieldType.STRING).description("멤버 프로필 이미지")
    );

    @Test
    @DisplayName("로그인한 멤버가 닉네임으로 멤버를 검색하면, 검색조건에 해당하는 200 OK와 멤버리스트를 반환한다")
    void searchMemberByNicknameTest() {
        Long memberId = 1L;
        String searchNickname = "icknam";

        given(this.specification).filter(document(DEFAULT_RESTDOC_PATH, AUTHORIZATION_HEADER, SEARCH_MEMBER_BY_NICKNAME_REQUEST_PARAMS,
                        SEARCH_MEMBER_BY_NICKNAME_RESPONSE))
                .accept(ContentType.JSON)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .header(HttpHeaders.AUTHORIZATION, this.createAuthorizationHeader(memberId))
                .queryParam("nickname", searchNickname)

        .when().get("/members")

        .then().statusCode(HttpStatus.OK.value())
                .body("code", equalTo(SuccessCode.MEMBER_READ_SEARCH.getCode()))
                .body("data.nickname", notNullValue())
                .log().all();
    }
}
