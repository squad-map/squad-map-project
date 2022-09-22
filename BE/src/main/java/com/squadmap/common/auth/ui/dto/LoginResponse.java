package com.squadmap.common.auth.ui.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class LoginResponse {

    private final String accessToken;
    private final String refreshToken;
    private final String nickname;
    private final String profileImage;

}
