package com.squadmap.comment.ui;

import com.squadmap.comment.application.CommentService;
import com.squadmap.comment.application.dto.CommentInfo;
import com.squadmap.comment.ui.dto.CommentRequest;
import com.squadmap.common.auth.Login;
import com.squadmap.member.application.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;
    private final MemberService memberService;

    @PostMapping("/places/{placeId}/comments")
    public CommentInfo writeComment(@Login Long memberId,
                                    @PathVariable Long placeId,
                                    @RequestBody CommentRequest commentRequest) {



        return null;
    }
}
