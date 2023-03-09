package com.squadmap.core.access;

import com.squadmap.common.excetpion.ClientException;
import com.squadmap.common.excetpion.ErrorStatusCodeAndMessage;
import com.squadmap.core.group.domain.PermissionLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.EnumSet;
import java.util.Set;

@Getter
@RequiredArgsConstructor
public enum AuthorityLevel {

    NONE, READ, MAINTAIN, HOST;

    public static Set<AuthorityLevel> levelSet = EnumSet.allOf(AuthorityLevel.class);
    public static AuthorityLevel from(String name) {
        return levelSet.stream()
                .filter(authorityLevel -> authorityLevel.name().equals(name))
                .findAny()
            .orElseThrow(() -> new ClientException(ErrorStatusCodeAndMessage.FORBIDDEN));
    }

}
