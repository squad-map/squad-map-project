package com.squadmap.assured;

import net.minidev.json.JSONObject;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.restdocs.snippet.Snippet;

import static io.restassured.RestAssured.given;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.restassured3.RestAssuredRestDocumentation.document;

public class SimpleTest extends RestAssuredTest {

    private static final Snippet REQUEST_FIELDS = requestFields(fieldWithPath("id").type(JsonFieldType.NUMBER).description("아이디"),
            fieldWithPath("nickName").type(JsonFieldType.STRING).description("닉네임")
    );

    private static final Snippet RESPONSE_FIELDS = responseFields(fieldWithPath("id").type(JsonFieldType.NUMBER).description("아이디"),
            fieldWithPath("nickName").type(JsonFieldType.STRING).description("닉네임")
    );

    @Test
    void get_test_response_test() {
        Long expectedId = 1L;
        String expectedNickName = "Ron2";

        JSONObject requestBody = new JSONObject();
        requestBody.put("id", expectedId);
        requestBody.put("nickName", expectedNickName);

        given(this.specification)
                .filter(document(DEFAULT_RESTDOC_PATH, REQUEST_FIELDS, RESPONSE_FIELDS))
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .body(requestBody)
                .log().all()

        .when().post("/users")

        .then()
                .statusCode(HttpStatus.OK.value())
                .body("id", Matchers.equalTo(expectedId.intValue()))
                .body("nickName", Matchers.equalTo(expectedNickName));

    }
}
