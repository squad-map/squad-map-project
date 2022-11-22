package com.squadmap.comment.application;

import com.squadmap.comment.application.dto.CommentInfo;
import com.squadmap.comment.application.dto.CommentResponse;
import com.squadmap.common.SimpleSlice;

public interface CommentService {

    CommentInfo writeComment(Long memberId, Long placeId, String content);

    CommentResponse updateComment(Long memberId, Long commentId, String contents);

    Long deleteComment(Long memberId, Long commentId);

    SimpleSlice<CommentInfo> readComments(Long memberId, Long placeId, Long lastCommentId, Integer size);
}
