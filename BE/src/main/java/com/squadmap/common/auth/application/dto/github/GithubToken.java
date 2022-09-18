package com.squadmap.common.auth.application.dto.github;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class GithubToken {

    private String accessToken;
    private String scope;
    private String tokenType;

    public String toAuthorizationHeader() {
        return tokenType + " " + accessToken;
    }

}
