package com.squadmap.core.group.application.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
public class AccessInfo {

    private final Long loginId;
    private final Long mapId;

    public static AccessInfo of(Long loginId, Long mapId) {
        return new AccessInfo(loginId, mapId);
    }

}
