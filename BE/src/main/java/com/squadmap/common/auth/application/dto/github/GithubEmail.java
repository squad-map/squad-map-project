package com.squadmap.common.auth.application.dto.github;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class GithubEmail {

    private final String email;
    private final boolean primary;

}
