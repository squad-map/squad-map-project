package com.squadmap.core.comment.application;

import com.squadmap.core.comment.application.dto.CommentInfo;
import com.squadmap.core.comment.application.dto.CommentResponse;
import com.squadmap.common.dto.SimpleSlice;
import com.squadmap.core.group.application.dto.AccessInfo;

public interface CommentService {

    CommentInfo writeComment(AccessInfo accessInfo, Long placeId, String content);

    CommentResponse updateComment(Long loginMemberId, Long commentId, String contents);

    void deleteComment(Long loginMemberId, Long commentId);

    SimpleSlice<CommentInfo> readComments(AccessInfo accessInfo, Long placeId, Long lastCommentId, Integer size);
}
