package com.squadmap.comment.integration;

import com.squadmap.IntegrationTest;
import com.squadmap.common.SimpleSlice;
import com.squadmap.common.excetpion.ClientException;
import com.squadmap.common.excetpion.ErrorStatusCodeAndMessage;
import com.squadmap.core.comment.application.CommentServiceImpl;
import com.squadmap.core.comment.application.dto.CommentInfo;
import com.squadmap.core.comment.application.dto.CommentResponse;
import com.squadmap.core.comment.domain.Comment;
import com.squadmap.core.comment.infrastructure.CommentRepository;
import com.squadmap.core.group.application.dto.AccessInfo;
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
    @DisplayName("지도 권한이 있는 멤버가 존재하는 장소라면, 해당 장소에 대한 댓글을 작성할 수 있다.")
    void writeCommentTest() {
        Long memberId = 1L;
        Long placeId = 1L;
        Long mapId = 1L;
        String content = "댓글";

        CommentInfo commentInfo = commentService.writeComment(AccessInfo.of(memberId, mapId), placeId, content);

        assertThat(commentInfo.getCommentId()).isPositive();
    }

    @Test
    @DisplayName("지도 권한이 없는 멤버라도 지도가 공개 지도라면 댓글을 작성할 수 있다.")
    void writeCommentTest_not_group_member_public_map() {
        Long memberId = 4L;
        Long mapId = 1L;
        Long placeId = 1L;
        String content = "댓글";

        CommentInfo commentInfo = commentService.writeComment(AccessInfo.of(memberId, mapId), placeId, content);

        assertThat(commentInfo.getCommentId()).isPositive();
    }

    @Test
    @DisplayName("비공개 지도에 권한이 없는 멤버가 장소에 댓글을 작성하려하면 예외가 발생한다.")
    void writeCommentTest_not_group_member_fail() {
        Long memberId = 5L;
        Long mapId = 2L;
        Long placeId = 2L;
        String content = "댓글";

        assertThatThrownBy(() -> commentService.writeComment(AccessInfo.of(memberId, mapId), placeId, content))
                .isInstanceOf(ClientException.class)
                .hasMessage(ErrorStatusCodeAndMessage.FORBIDDEN.getMessage());
    }


    @Test
    @DisplayName("장소가 존재하지않을 때, 댓글을 작성하면 익셉션이 발생한다.")
    void writeCommentTest_no_such_place_fail() {
        Long memberId = 1L;
        Long mapId = 1L;
        Long placeId = 100L;
        String content = "댓글";

        assertThatThrownBy(() -> commentService.writeComment(AccessInfo.of(memberId, mapId), placeId, content))
                .isInstanceOf(ClientException.class)
                .hasMessage(ErrorStatusCodeAndMessage.NO_SUCH_PLACE.getMessage());
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
    @DisplayName("댓글의 작성자가 아닌 멤버가 댓글을 수정하면 익셉션이 발생한다.")
    void updateCommentTest_other_member_fail() {
        Long memberId = 4L;
        Long commentId = 1L;
        String content = "수정된 댓글";

        assertThatThrownBy(() -> commentService.updateComment(memberId, commentId, content))
                .isInstanceOf(ClientException.class)
                .hasMessage(ErrorStatusCodeAndMessage.FORBIDDEN.getMessage());

    }

    @Test
    @DisplayName("존재하지 않는 댓글을 수정하려하면 익셉션이 발생한다.")
    void updateCommentTest_no_such_comment_fail() {
        Long memberId = 1L;
        Long commentId = 100L;
        String content = "수정된 댓글";

        assertThatThrownBy(() -> commentService.updateComment(memberId, commentId, content))
                .isInstanceOf(ClientException.class)
                .hasMessage(ErrorStatusCodeAndMessage.NO_SUCH_COMMENT.getMessage());

    }

    @Test
    @DisplayName("지도를 읽을 수 있는 사용자라면, 선택 댓글 이후의 댓글들을 조회할 수 있다.")
    void readCommentTest() {
        Long memberId = 1L;
        Long mapId = 1L;
        Long placeId = 1L;
        Long lastCommentId = 1L;
        Integer size = 5;

        SimpleSlice<CommentInfo> comments = commentService.readComments(AccessInfo.of(memberId, mapId), placeId, lastCommentId, size);

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
    void deleteCommentTest_not_writer_fail() {
        Long memberId = 3L;
        Long commentId = 1L;

        assertThatThrownBy(() -> commentService.deleteComment(memberId, commentId))
                .isInstanceOf(ClientException.class)
                .hasMessage(ErrorStatusCodeAndMessage.FORBIDDEN.getMessage());
    }

    @Test
    @DisplayName("존재하지않는 댓글을 삭제하려하면, ClientException이 발생한다.")
    void deleteCommentTest_no_such_comment_fail() {
        Long memberId = 3L;
        Long commentId = 10000L;

        assertThatThrownBy(() -> commentService.deleteComment(memberId, commentId))
                .isInstanceOf(ClientException.class)
                .hasMessage(ErrorStatusCodeAndMessage.NO_SUCH_COMMENT.getMessage());
    }



}
