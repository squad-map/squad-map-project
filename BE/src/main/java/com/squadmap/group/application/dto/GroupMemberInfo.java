package com.squadmap.group.application.dto;

import com.squadmap.group.domain.PermissionLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class GroupMemberInfo {

    private final Long memberId;
    private final String memberNickname;
    private final String memberProfileImage;
    private final PermissionLevel permissionLevel;

}
