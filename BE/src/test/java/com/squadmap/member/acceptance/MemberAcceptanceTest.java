package com.squadmap.member.acceptance;

import com.squadmap.assured.RestAssuredTest;
import com.squadmap.member.ui.dto.NicknameUpdateRequest;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.restdocs.snippet.Snippet;

import static io.restassured.RestAssured.given;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.restassured3.RestAssuredRestDocumentation.document;

class MemberAcceptanceTest extends RestAssuredTest {


    private static final Snippet NICKNAME_UPDATE_REQUEST_FIELDS = requestFields(
            fieldWithPath("nickname").type(JsonFieldType.STRING).description("수정하고자하는 닉네임")
    );

    private static final Snippet NICKNAME_UPDATE_RESPONSE_FIELDS = responseFields(
            fieldWithPath("nickname").type(JsonFieldType.STRING).description("수정된 닉네임")
    );

    @Test
    void nicknameUpdateTest() {
        String accessToken = jwtProvider.generateAccessToken(1L);
        accessToken = "bearer " + accessToken;
        String nickname = "update nickname";
        NicknameUpdateRequest nickNameUpdateRequest = new NicknameUpdateRequest(nickname);
        given(this.specification).filter(document(DEFAULT_RESTDOC_PATH, NICKNAME_UPDATE_REQUEST_FIELDS, NICKNAME_UPDATE_RESPONSE_FIELDS, AUTHORIZATION_HEADER))
                .accept(ContentType.JSON)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .header(HttpHeaders.AUTHORIZATION, accessToken)
                .body(nickNameUpdateRequest)
                .log().all()

        .when().post("/member/update")

        .then().statusCode(HttpStatus.OK.value())
                .log().all();

    }
}
