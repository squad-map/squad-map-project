package com.squadmap.map.application;

import com.squadmap.map.domain.Map;
import com.squadmap.map.infrastructure.MapRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class MapServiceImpl implements MapService{

    private final MapRepository mapRepository;

    @Override
    public Long create(String mapName, Boolean isPrivate, Long memberId) {
        Map save = mapRepository.save(Map.of(mapName, isPrivate, memberId));

        return save.getId();
    }

    @Override
    public void update(Long memberId, Long mapId, String mapName, Boolean isPrivate) {
        // 권한 검증 로직이 필요
        Map targetMap = mapRepository.findById(mapId)
                .orElseThrow(NoSuchElementException::new);
        targetMap.update(mapName, isPrivate);
    }
}
