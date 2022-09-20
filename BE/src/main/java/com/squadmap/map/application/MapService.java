package com.squadmap.map.application;

import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly = true)
public interface MapService {

    @Transactional
    Long create(String mapName, Boolean isPrivate, Long memberId);

    @Transactional
    void update(Long memberId, Long mapId, String mapName, Boolean isPrivate);

}
