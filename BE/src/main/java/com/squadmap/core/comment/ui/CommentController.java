package com.squadmap.core.comment.ui;

import com.squadmap.common.dto.CommonResponse;
import com.squadmap.common.dto.SuccessCode;
import com.squadmap.core.comment.application.CommentService;
import com.squadmap.core.comment.application.dto.CommentInfo;
import com.squadmap.core.comment.application.dto.CommentResponse;
import com.squadmap.core.comment.ui.dto.CommentRequest;
import com.squadmap.common.dto.SimpleSlice;
import com.squadmap.common.auth.Login;
import com.squadmap.core.group.application.dto.AccessInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/map/{mapId}/places/{placeId}/comments")
    @ResponseStatus(HttpStatus.CREATED)
    public CommonResponse<CommentInfo> writeComment(@Login Long loginId,
                                                   @PathVariable Long mapId,
                                                   @PathVariable Long placeId,
                                                   @RequestBody @Valid CommentRequest commentRequest) {
        CommentInfo commentInfo = commentService.writeComment(AccessInfo.of(loginId, mapId), placeId, commentRequest.getContent());

        return CommonResponse.success(SuccessCode.COMMENT_CREATE, commentInfo);
    }


    @PatchMapping("/comments/{commentId}")
    public CommonResponse<CommentResponse> updateComment(@Login Long memberId,
                                         @PathVariable Long commentId,
                                         @RequestBody @Valid CommentRequest commentRequest) {

        CommentResponse commentResponse = commentService.updateComment(memberId, commentId, commentRequest.getContent());

        return CommonResponse.success(SuccessCode.CATEGORY_UPDATE, commentResponse);
    }

    @GetMapping("/map/{mapId}/places/{placeId}/comments")
    public CommonResponse<SimpleSlice<CommentInfo>> readCommentsOfPlace(@Login Long memberId,
                                                        @PathVariable Long mapId,
                                                        @PathVariable Long placeId,
                                                        Long lastCommentId, Integer size) {
        SimpleSlice<CommentInfo> commentInfos = commentService.readComments(AccessInfo.of(memberId, mapId), placeId, lastCommentId, size);
        return CommonResponse.success(SuccessCode.CATEGORY_READ_ALL, commentInfos);
    }

    @DeleteMapping("/comments/{commentId}")
    public CommonResponse<Void> deleteComment(@Login Long memberId, @PathVariable Long commentId) {
        commentService.deleteComment(memberId, commentId);

        return CommonResponse.emptyData(SuccessCode.COMMENT_DELETE);
    }
}
