package com.squadmap.core.group.application.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class GroupMemberInfo {

    private final Long memberId;
    private final String memberNickname;
    private final String memberProfileImage;
    private final String level;

}
