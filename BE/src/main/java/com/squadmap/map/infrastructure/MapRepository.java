package com.squadmap.map.infrastructure;

import com.squadmap.map.domain.Map;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MapRepository extends JpaRepository<Map, Long> {
    Map findTopByOrderByIdDesc();
}
