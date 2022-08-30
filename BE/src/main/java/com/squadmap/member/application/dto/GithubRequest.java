package com.squadmap.member.application.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class GithubRequest {

    private final String clientId;
    private final String clientSecret;
    private final String code;

}
