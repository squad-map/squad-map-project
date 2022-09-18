package com.squadmap.member.acceptance;

import com.squadmap.assured.RestAssuredTest;
import com.squadmap.category.infrastructure.CategoryRepository;
import com.squadmap.common.auth.ui.dto.LoginRequest;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.restdocs.snippet.Snippet;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.restassured3.RestAssuredRestDocumentation.document;

class MemberAcceptanceTest extends RestAssuredTest {

    private static final Snippet LOGIN_REQUEST_FIELDS = requestFields(
            fieldWithPath("code").type(JsonFieldType.STRING).description("code"),
            fieldWithPath("redirectUri").type(JsonFieldType.STRING).description("리다이렉트 path")
    );

    private static final Snippet LOGIN_RESPONSE_FIELDS = responseFields(
            fieldWithPath("accessToken").type(JsonFieldType.STRING).description("엑세스 토큰"),
            fieldWithPath("refreshToken").type(JsonFieldType.STRING).description("리프레쉬 토큰")
    );

    @Test
    void loginGithubTest() {
        CategoryRepository categoryRepository;
        String code = "";
        String redirectUri = "";
        LoginRequest githubLogin = new LoginRequest(code, redirectUri);

        String accessToken = "access token";
        String refreshToken = "refresh token";

        given(this.specification).filter(document(DEFAULT_RESTDOC_PATH, LOGIN_REQUEST_FIELDS, LOGIN_RESPONSE_FIELDS))
                .accept(ContentType.JSON)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .body(githubLogin)
                .log().all()

        .when().post("/login/github")

        .then().statusCode(HttpStatus.OK.value())
                .body("accessToken", equalTo(accessToken))
                .body("refreshToken", equalTo(refreshToken));


    }
}
