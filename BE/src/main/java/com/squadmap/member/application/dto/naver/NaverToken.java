package com.squadmap.member.application.dto.naver;

import lombok.Getter;

@Getter
public class NaverToken {

    private String accessToken;
    private String refreshToken;
    private String tokenType;

    public String toAuthorizationHeader() {
        return tokenType + " " + accessToken;
    }
}
