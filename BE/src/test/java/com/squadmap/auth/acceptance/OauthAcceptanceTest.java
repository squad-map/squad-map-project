package com.squadmap.auth.acceptance;

import com.squadmap.assured.RestAssuredTest;
import com.squadmap.auth.OauthMockProvider;
import com.squadmap.common.auth.ui.dto.LoginRequest;
import com.squadmap.common.dto.SuccessCode;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.cloud.contract.wiremock.AutoConfigureWireMock;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.restdocs.snippet.Snippet;

import java.io.IOException;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.notNullValue;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.restassured3.RestAssuredRestDocumentation.document;

@AutoConfigureWireMock(port = 9090)
class OauthAcceptanceTest extends RestAssuredTest {

    @BeforeAll
    static void setUp() {
        try {
            OauthMockProvider.setUpResponses();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static final Snippet LOGIN_REQUEST_FIELDS = requestFields(
            fieldWithPath("code").type(JsonFieldType.STRING).description("ResourceServer 로그인 후, 반환 받은 Authorization Code"),
            fieldWithPath("state").type(JsonFieldType.STRING).description("naver 로그인 시, code 요청할 때 전송한 UUID").optional()
    );

    private static final Snippet LOGIN_RESPONSE_FIELDS = responseFields(
            fieldWithPath(makeFieldName("access_token")).type(JsonFieldType.STRING).description("액세스 토큰"),
            fieldWithPath(makeFieldName("refresh_token")).type(JsonFieldType.STRING).description("리프레쉬 토큰"),
            fieldWithPath(makeFieldName("member_id")).type(JsonFieldType.NUMBER).description("사용자 id"),
            fieldWithPath(makeFieldName("nickname")).type(JsonFieldType.STRING).description("사용자 닉네임"),
            fieldWithPath(makeFieldName("profile_image")).type(JsonFieldType.STRING).description("사용자 프로필 이미지")
    );


    @Test
    @DisplayName("정상적인 github authorization_code로 로그인을 요청한다면, 토큰과 유저정보를 반환한다.")
    void githubLoginTest() {

        given(this.specification).filter(document(DEFAULT_RESTDOC_PATH, LOGIN_REQUEST_FIELDS, COMMON_RESPONSE_FIELDS, LOGIN_RESPONSE_FIELDS))
                .accept(ContentType.JSON)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .body(new LoginRequest("github_authorization_code", null))
                .log()
                .all()

        .when()
                .post("login/github")

        .then().log().all()
                .statusCode(HttpStatus.OK.value())
                .body("code", equalTo(SuccessCode.LOGIN.getCode()))
                .body("member_id", notNullValue(Long.TYPE))
                .body("nickname", equalTo("CMSSKKK"))
                .body("profile_image", equalTo("https://avatars.githubusercontent.com/u/81129309?v=4"))
                .body("access_token", notNullValue(String.class))
                .body("refresh_token", notNullValue(String.class));
    }

    @Test
    @DisplayName("정상적인 naver authorization_code로 로그인을 요청한다면, 토큰과 유저정보를 반환한다.")
    void naverLoginTest() {

        given(this.specification).filter(document(DEFAULT_RESTDOC_PATH, LOGIN_REQUEST_FIELDS, COMMON_RESPONSE_FIELDS, LOGIN_RESPONSE_FIELDS))
                .accept(ContentType.JSON)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .body(new LoginRequest("naver_authorization_code", "state"))
                .log()
                .all()

        .when()
                .post("login/naver")

        .then().log().all()
                .statusCode(HttpStatus.OK.value())
                .body("code", equalTo(SuccessCode.LOGIN.getCode()))
                .body("member_id", notNullValue(Long.TYPE))
                .body("nickname", equalTo("최민석"))
                .body("profile_image", equalTo("https://ssl.pstatic.net/static/pwe/address/img_profile.png"))
                .body("access_token", notNullValue(String.class))
                .body("refresh_token", notNullValue(String.class));
    }

    private static final Snippet REISSUE_RESPONSE_FIELDS = responseFields(
            fieldWithPath(makeFieldName("access_token")).type(JsonFieldType.STRING).description("엑세스 토큰")
    );

    @Test
    @DisplayName("유효한 리프레쉬 토큰으로 액세스 토큰을 재발급 요청을 하면, 새로운 엑세스 토큰을 재발급한다.")
    void reissueTest() {

        given(this.specification).filter(document(DEFAULT_RESTDOC_PATH, AUTHORIZATION_HEADER, COMMON_RESPONSE_FIELDS, REISSUE_RESPONSE_FIELDS))
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .contentType(ContentType.JSON)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + jwtProvider.generateRefreshToken(1L))
                .log().all()

        .when().get("/login")

        .then().statusCode(HttpStatus.OK.value())
                .body("access_token", notNullValue())
                .log().all();

    }



}
