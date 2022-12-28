package com.squadmap.core.group.application.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class GroupMemberSimpleInfo {

    private final Long mapId;
    private final Long memberId;
    private final String level;

}
