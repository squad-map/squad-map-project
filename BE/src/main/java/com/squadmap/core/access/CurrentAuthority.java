package com.squadmap.core.access;

import com.squadmap.core.group.domain.PermissionLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class CurrentAuthority {

    private final Long memberId;
    private final AuthorityLevel authorityLevel;

    public static CurrentAuthority externalUser() {
        return new CurrentAuthority(null, AuthorityLevel.NONE);
    }

}

