package com.squadmap.member.application.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class LoginInfo {

    private final String nickname;
    private final String avatarUrl;
    private final Tokens tokens;

}
