package com.squadmap.map.application;

import org.springframework.transaction.annotation.Transactional;


public interface MapService {


    Long create(String mapName, Boolean isPrivate, Long memberId);


    void update(Long memberId, Long mapId, String mapName, boolean fullDisclosure);

}
