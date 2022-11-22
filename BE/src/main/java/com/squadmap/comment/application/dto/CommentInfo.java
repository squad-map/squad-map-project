package com.squadmap.comment.application.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class CommentInfo {

    private final Long memberId;
    private final String memberNickname;
    private final String memberProfileImage;
    private final Long commentId;
    private final String content;

}
