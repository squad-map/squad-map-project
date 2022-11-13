package com.squadmap.comment.integration;

import com.squadmap.IntegrationTest;
import com.squadmap.comment.application.CommentService;
import com.squadmap.comment.application.dto.CommentInfo;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.assertj.core.api.Assertions.*;


class CommentServiceTest extends IntegrationTest {

    @Autowired
    private CommentService commentService;


    @Test
    @DisplayName("존재하는 멤버와 장소라면, 해당 장소에 대한 댓글을 작성할 수 있다.")
    void writeCommentTest() {
        Long memberId = 1L;
        Long placeId = 1L;
        String comment = "댓글";

        CommentInfo commentInfo = commentService.writeComment(memberId, placeId, comment);

        assertThat(commentInfo.getCommentId()).isPositive();
    }
}
