package com.squadmap.core.map.infrastructure;


import com.squadmap.core.map.domain.Map;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface MapRepository extends JpaRepository<Map, Long> {

    Slice<Map> findMapsByFullDisclosureAndIdGreaterThan(Pageable pageable, Boolean fullDisclosure, Long id);

    List<Map> findAllByMemberId(Long memberId);

    Optional<Long> findMemberIdById(Long mapId);

    Slice<Map> findMapsByFullDisclosureAndIdGreaterThanAndNameStartingWith(Pageable pageable, Boolean fullDisclosure, Long id, String name);

//    @Query("select m from Map m where m.id in :ids and m.name like :name%")
//    List<Map> findAllByIdsAndNameContaining(@Param("ids") List<Long> ids, @Param("name") String name);

    Slice<Map> findMapsByIdIsInAndIdGreaterThanAndNameStartingWith(Pageable pageable, List<Long> ids, Long id, String name);

    Slice<Map> findMapsByIdIsInAndIdGreaterThan(Pageable pageable, List<Long> ids, Long id);

    @Modifying
    @Query("delete from Map m where m.id = :id")
    void deleteById(@Param("id") Long id);

}
