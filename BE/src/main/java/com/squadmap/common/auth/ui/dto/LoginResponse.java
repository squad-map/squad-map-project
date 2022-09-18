package com.squadmap.common.auth.ui.dto;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
@EqualsAndHashCode
public class LoginResponse {

    private final String accessToken;
    private final String refreshToken;
    private final String userNickname;
    private final String userProfileUrl;

}
