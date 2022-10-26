package com.squadmap.group.ui.dto;

import com.squadmap.group.domain.PermissionLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class AddMemberRequest {

    private Long memberId;
    private String permissionLevel;
}
