package com.squadmap.comment.acceptance;

import com.squadmap.assured.RestAssuredTest;
import com.squadmap.core.comment.ui.dto.CommentRequest;
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
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.restdocs.restassured3.RestAssuredRestDocumentation.document;

public class CommentAcceptanceTest extends RestAssuredTest {

    private static final Snippet COMMENT_READ_REQUEST_PATH = pathParameters(
            parameterWithName("place_id").description("장소의 아이디")
    );

    private static final Snippet COMMENT_REQUEST_FIELDS = requestFields(
            fieldWithPath("content").type(JsonFieldType.STRING).description("작성 댓글")
    );

    private static final Snippet CREATE_COMMENT_RESPONSE_FIELDS = responseFields(
            fieldWithPath("member_id").type(JsonFieldType.NUMBER).description("댓글 작성자 아이디"),
            fieldWithPath("member_nickname").type(JsonFieldType.STRING).description("댓글 작성자 닉네임"),
            fieldWithPath("member_profile_image").type(JsonFieldType.STRING).description("댓글 작성자 프로필 이미지 URL"),
            fieldWithPath("comment_id").type(JsonFieldType.NUMBER).description("댓글 아이디"),
            fieldWithPath("content").type(JsonFieldType.STRING).description("작성 댓글")
    );

    @Test
    @DisplayName("지도에 Read 권한 이상의 사용자는 장소에 댓글을 작성할 수 있으며, 성공하면 상태코드 201을 반환한다.")
    void createTest() {
        Long memberId = 1L;
        Long placeId = 1L;

        CommentRequest commentRequest = new CommentRequest("Hi, I love it");
        given(this.specification)
                .filter(document(DEFAULT_RESTDOC_PATH, AUTHORIZATION_HEADER,
                        COMMENT_READ_REQUEST_PATH, COMMENT_REQUEST_FIELDS, CREATE_COMMENT_RESPONSE_FIELDS))
                .accept(ContentType.JSON)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .header(HttpHeaders.AUTHORIZATION, this.createAuthorizationHeader(memberId))
                .pathParam("place_id", placeId)
                .body(commentRequest)
                .log().all()

        .when().post("/places/{place_id}/comments", placeId)

        .then().statusCode(HttpStatus.CREATED.value())
                .log().all();
    }

    private static final Snippet COMMENT_UPDATE_REQUEST_PATH = pathParameters(
            parameterWithName("comment_id").description("수정하고자 하는 댓글의 아이디")
    );

    private static final Snippet COMMENT_UPDATE_RESPONSE_FIELD = responseFields(
        fieldWithPath("comment_id").type(JsonFieldType.NUMBER).description("수정된 댓글의 아이디")
    );

    @Test
    @DisplayName("댓글 작성자는 댓글을 수정할 수 있으며, 성공하면 상태코드 200을 반환한다.")
    void updateTest() {

        Long memberId = 1L;
        Long commentId = 1L;

        CommentRequest commentRequest = new CommentRequest("Hi, I love it");

        given(this.specification)
                .filter(document(DEFAULT_RESTDOC_PATH, AUTHORIZATION_HEADER,
                        COMMENT_UPDATE_REQUEST_PATH, COMMENT_REQUEST_FIELDS, COMMENT_UPDATE_RESPONSE_FIELD))
                .accept(ContentType.JSON)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .header(HttpHeaders.AUTHORIZATION, this.createAuthorizationHeader(memberId))
                .pathParam("comment_id", commentId)
                .body(commentRequest)
                .log().all()

        .when().patch("/comments/{comment_id}", commentId)

        .then().statusCode(HttpStatus.OK.value())
                .body("comment_id", equalTo(commentId.intValue()))
                .log().all();

    }

    private static final Snippet READ_PAGING_NEXT_COMMENTS_READ_QUERY_PARAMS = requestParameters(
            parameterWithName("lastCommentId").description("마지막으로 표시된 댓글의 아이디"),
            parameterWithName("size").description("요청하고자하는 댓글의 갯수")
    );

    private static final Snippet READ_PAGING_COMMENTS_RESPONSE_FIELDS = responseFields(
            fieldWithPath("size").type(JsonFieldType.NUMBER).description("요청한 댓글의 갯수"),
            fieldWithPath("number_of_elements").type(JsonFieldType.NUMBER).description("실제 반환하는 댓글의 갯수"),
            fieldWithPath("has_next").type(JsonFieldType.BOOLEAN).description("아직 보여지지 않은 댓글들의 존재 여부"),
            fieldWithPath("content[].member_id").type(JsonFieldType.NUMBER).description("댓글 작성자 아이디"),
            fieldWithPath("content[].member_nickname").type(JsonFieldType.STRING).description("댓글 작성자 닉네임"),
            fieldWithPath("content[].member_profile_image").type(JsonFieldType.STRING).description("댓글 작성자 프로필 이미지 URL"),
            fieldWithPath("content[].comment_id").type(JsonFieldType.NUMBER).description("댓글 아이디"),
            fieldWithPath("content[].content").type(JsonFieldType.STRING).description("작성 댓글")

    );

    @Test
    @DisplayName("지도에 Read 권한 이상의 사용자 또는 PUBLIC 지도의 경우, 마지막 댓글의 아이디를 기준으로 이 후의 댓글들을 요청할 수 있으며, 성공하면 상태코드 200을 반환한다.")
    void nextCommentReadTest() {

        Long memberId = 1L;
        Long placeId = 1L;
        Long lastCommentId = 1L;
        Integer requestSize = 5;

        given(this.specification)
                .filter(document(DEFAULT_RESTDOC_PATH, AUTHORIZATION_HEADER,
                        COMMENT_READ_REQUEST_PATH, READ_PAGING_NEXT_COMMENTS_READ_QUERY_PARAMS, READ_PAGING_COMMENTS_RESPONSE_FIELDS))
                .accept(ContentType.JSON)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .header(HttpHeaders.AUTHORIZATION, this.createAuthorizationHeader(memberId))
                .pathParam("place_id", placeId)
                .queryParam("lastCommentId", lastCommentId)
                .queryParam("size", requestSize)
                .log().all()

        .when().get("/places/{place_id}/comments", placeId)

        .then().statusCode(HttpStatus.OK.value())
                .log().all();

    }

    private static final Snippet COMMENT_DELETE_REQUEST_PATH = pathParameters(
            parameterWithName("comment_id").description("삭제하고자하는 댓글의 아이디")
    );

    private static final Snippet COMMENT_DELETE_RESPONSE_FIELD = responseFields(
            fieldWithPath("comment_id").type(JsonFieldType.NUMBER).description("삭제된 댓글의 아이디")
    );

    @Test
    @DisplayName("댓글 작성자는 자신이 작성한 댓글을 삭제할 수 있으며, 성공하면 상태코드 200을 반환한다.")
    void deleteCommentTest() {

        Long memberId = 1L;
        Long commentId = 1L;

        given(this.specification)
                .filter(document(DEFAULT_RESTDOC_PATH, AUTHORIZATION_HEADER,
                        COMMENT_DELETE_REQUEST_PATH, COMMENT_DELETE_RESPONSE_FIELD))
                .accept(ContentType.JSON)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .header(HttpHeaders.AUTHORIZATION, this.createAuthorizationHeader(memberId))
                .pathParam("comment_id", commentId)
                .log().all()

        .when().delete("/comments/{comment_id}", commentId)

        .then().statusCode(HttpStatus.OK.value())
                .log().all();
    }

}
