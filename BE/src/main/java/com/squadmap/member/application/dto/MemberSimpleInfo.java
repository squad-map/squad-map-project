package com.squadmap.member.application.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class MemberSimpleInfo {

    private final Long id;
    private final String nickname;
    private final String profileImage;
}
