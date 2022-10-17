package com.squadmap.map.infrastructure;


import com.squadmap.map.domain.Map;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.repository.query.Param;

public interface MapRepository extends JpaRepository<Map, Long> {

    Page<Map> findAllByFullDisclosure(@Param("fullDisclosure") boolean fullDisclosure, Pageable pageable);

}
