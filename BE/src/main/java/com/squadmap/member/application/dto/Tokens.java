package com.squadmap.member.application.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class Tokens {

    private final String accessToken;
    private final String refreshToken;
}
