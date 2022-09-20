package com.squadmap.common.auth.application.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class LoginInfo {

    private final Long memberId;
    private final String nickname;
    private final String profileImage;
    private final Tokens tokens;

}
