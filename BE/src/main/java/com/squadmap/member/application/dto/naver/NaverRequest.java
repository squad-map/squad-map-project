package com.squadmap.member.application.dto.naver;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class NaverRequest {

    private final String clientId;
    private final String clientSecret;
    private final String redirectUri;
    private final String code;
    private final String state;
}
