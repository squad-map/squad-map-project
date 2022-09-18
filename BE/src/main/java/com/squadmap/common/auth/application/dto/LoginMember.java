package com.squadmap.common.auth.application.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class LoginMember {

    private final Long id;
    private final String nickname;
    private final String avatarUrl;
    private final String email;

}
