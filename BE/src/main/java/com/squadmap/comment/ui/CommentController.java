package com.squadmap.comment.ui;

import com.squadmap.comment.application.CommentService;
import com.squadmap.comment.application.dto.CommentInfo;
import com.squadmap.comment.application.dto.CommentResponse;
import com.squadmap.comment.ui.dto.CommentRequest;
import com.squadmap.common.SimpleSlice;
import com.squadmap.common.auth.Login;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/places/{placeId}/comments")
    @ResponseStatus(HttpStatus.CREATED)
    public CommentInfo writeComment(@Login Long memberId,
                                    @PathVariable Long placeId,
                                    @RequestBody @Valid CommentRequest commentRequest) {

        return commentService.writeComment(memberId, placeId, commentRequest.getContent());
    }


    @PatchMapping("/comments/{commentId}")
    public CommentResponse updateComment(@Login Long memberId,
                                         @PathVariable Long commentId,
                                         @RequestBody @Valid CommentRequest commentRequest) {

        return commentService.updateComment(memberId, commentId, commentRequest.getContent());
    }

    @GetMapping("/places/{placeId}/comments")
    public SimpleSlice<CommentInfo> readCommentsOfPlace(@Login Long memberId,
                                                        @PathVariable Long placeId,
                                                        Long lastCommentId, Integer size) {

        return commentService.readComments(memberId, placeId, lastCommentId, size);
    }

    @DeleteMapping("/comments/{commentId}")
    public CommentResponse deleteComment(@Login Long memberId, @PathVariable Long commentId) {

        return new CommentResponse(commentService.deleteComment(memberId, commentId));
    }
}
