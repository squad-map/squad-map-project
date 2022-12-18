package com.squadmap.core.comment.ui;

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
    public CommentInfo writeComment(@Login Long loginId,
                                    @PathVariable Long mapId,
                                    @PathVariable Long placeId,
                                    @RequestBody @Valid CommentRequest commentRequest) {

        return commentService.writeComment(AccessInfo.of(loginId, mapId), placeId, commentRequest.getContent());
    }


    @PatchMapping("/comments/{commentId}")
    public CommentResponse updateComment(@Login Long memberId,
                                         @PathVariable Long commentId,
                                         @RequestBody @Valid CommentRequest commentRequest) {

        return commentService.updateComment(memberId, commentId, commentRequest.getContent());
    }

    @GetMapping("/map/{mapId}/places/{placeId}/comments")
    public SimpleSlice<CommentInfo> readCommentsOfPlace(@Login Long memberId,
                                                        @PathVariable Long mapId,
                                                        @PathVariable Long placeId,
                                                        Long lastCommentId, Integer size) {

        return commentService.readComments(AccessInfo.of(memberId, mapId), placeId, lastCommentId, size);
    }

    @DeleteMapping("/comments/{commentId}")
    public CommentResponse deleteComment(@Login Long memberId, @PathVariable Long commentId) {

        return new CommentResponse(commentService.deleteComment(memberId, commentId));
    }
}
