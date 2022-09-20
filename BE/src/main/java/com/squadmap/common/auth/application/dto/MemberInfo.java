package com.squadmap.common.auth.application.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class MemberInfo {

    private final String nickname;
    private final String profileImageUrl;
    private final String email;

}
