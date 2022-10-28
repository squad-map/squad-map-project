package com.squadmap.group.ui.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class GroupMemberRequest {

    private Long memberId;
    private String permissionLevel;
}
