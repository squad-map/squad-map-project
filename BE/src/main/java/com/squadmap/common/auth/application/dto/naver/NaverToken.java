package com.squadmap.common.auth.application.dto.naver;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;

@Getter
@JsonIgnoreProperties(ignoreUnknown = true)
public class NaverToken {

    private String accessToken;
    private String refreshToken;
    private String tokenType;

    public String toAuthorizationHeader() {
        return tokenType + " " + accessToken;
    }
}
