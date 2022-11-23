package com.squadmap.comment.integration;

import com.squadmap.IntegrationTest;
import com.squadmap.core.comment.application.CommentServiceImpl;
import com.squadmap.core.comment.application.dto.CommentInfo;
import com.squadmap.core.comment.application.dto.CommentResponse;
import com.squadmap.core.comment.domain.Comment;
import com.squadmap.core.comment.infrastructure.CommentRepository;
import com.squadmap.common.SimpleSlice;
import com.squadmap.common.excetpion.ClientException;
import com.squadmap.common.excetpion.ErrorStatusCodeAndMessage;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@IntegrationTest
class CommentServiceTest {

    @Autowired
    private CommentServiceImpl commentService;

    @Autowired
    private CommentRepository commentRepository;

    @Test
    @DisplayName("존재하는 멤버와 장소라면, 해당 장소에 대한 댓글을 작성할 수 있다.")
    void writeCommentTest() {
        Long memberId = 1L;
        Long placeId = 1L;
        String content = "댓글";

        CommentInfo commentInfo = commentService.writeComment(memberId, placeId, content);

        assertThat(commentInfo.getCommentId()).isPositive();
    }

    @Test
    @DisplayName("댓글의 작성자는 댓글을 수정할 수 있다.")
    void updateCommentTest() {
        Long memberId = 1L;
        Long commentId = 1L;
        String content = "수정된 댓글";

        CommentResponse commentResponse = commentService.updateComment(memberId, commentId, content);

        Comment comment = commentRepository.findById(commentId).get();

        assertThat(commentResponse.getCommentId()).isEqualTo(commentId);
        assertThat(comment.getContent()).isEqualTo(content);

    }

    @Test
    @DisplayName("지도를 읽을 수 있는 사용자라면, 선택 댓글 이후의 댓글들을 조회할 수 있다.")
    void readCommentTest() {
        Long memberId = 1L;
        Long placeId = 1L;
        Long lastCommentId = 1L;
        Integer size = 5;

        SimpleSlice<CommentInfo> comments = commentService.readComments(memberId, placeId, lastCommentId, size);

        assertThat(comments.getNumberOfElements()).isEqualTo(2);
        assertThat(comments.getSize()).isEqualTo(size);
        assertThat(comments.hasNext()).isFalse();
    }

    @Test
    @DisplayName("댓글의 작성자는 댓글을 삭제할 수 있다.")
    void deleteCommentTest() {
        Long memberId = 1L;
        Long commentId = 1L;

        Long deletedCommentId = commentService.deleteComment(memberId, commentId);

        assertThat(deletedCommentId).isEqualTo(commentId);
        assertThat(commentRepository.findById(commentId).isEmpty()).isTrue();
    }

    @Test
    @DisplayName("댓글의 작성자가 아닌 사용자가 댓글을 삭제하려하면, ClientException이 발생한다.")
    void deleteCommentTest_not_writer_error() {
        Long memberId = 3L;
        Long commentId = 1L;

        assertThatThrownBy(() -> commentService.deleteComment(memberId, commentId))
                .isInstanceOf(ClientException.class)
                .hasMessage(ErrorStatusCodeAndMessage.FORBIDDEN.getMessage());
    }



}
