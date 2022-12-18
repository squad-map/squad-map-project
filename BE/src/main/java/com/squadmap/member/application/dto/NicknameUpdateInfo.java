package com.squadmap.member.application.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class NicknameUpdateInfo {

    private final Long memberId;
    private final String nickname;
}
