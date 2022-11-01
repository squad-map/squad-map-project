package com.squadmap.map.infrastructure;


import com.squadmap.map.domain.Map;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface MapRepository extends JpaRepository<Map, Long> {

    Page<Map> findAllByFullDisclosure(boolean fullDisclosure, Pageable pageable);

    List<Map> findAllByMemberId(Long memberId);

    Optional<Long> findMemberIdById(Long mapId);

    Page<Map> findAllByFullDisclosureAndNameContaining(Pageable pageable, boolean fullDisclosure, String name);

    @Query("select m from Map m where m.id in :ids and m.name like %:name%")
    List<Map> findAllByIdsAndNameContaining(@Param("ids") List<Long> ids, @Param("name") String name);

}
