package com.squadmap.map.application;

import com.squadmap.map.domain.Map;
import com.squadmap.map.infrastructure.MapRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MapServiceImpl implements MapService{

    private final MapRepository mapRepository;

    @Override
    public Long create(String mapName, Boolean isPrivate, Long memberId) {
        Map save = mapRepository.save(Map.of(mapName, isPrivate, memberId));

        return save.getId();
    }
}
