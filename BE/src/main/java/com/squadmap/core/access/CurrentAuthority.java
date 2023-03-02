package com.squadmap.core.access;

import com.squadmap.core.group.domain.PermissionLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class CurrentAuthority {

    private final Long memberId;
    private final PermissionLevel permissionLevel;

}

