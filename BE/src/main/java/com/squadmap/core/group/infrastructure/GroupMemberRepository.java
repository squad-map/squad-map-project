package com.squadmap.core.group.infrastructure;

import com.squadmap.core.group.domain.GroupMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface GroupMemberRepository extends JpaRepository<GroupMember, Long> {

    List<GroupMember> findByMapId(Long mapId);

    Optional<GroupMember> findByMapIdAndMemberId(Long mapId, Long memberId);

    void deleteByMapIdAndMemberId(Long mapId, Long memberId);

    boolean existsByMapIdAndMemberId(Long mapId, Long memberId);

    @Query("select gm.id from GroupMember gm where gm.memberId = :memberId")
    List<Long> findMapIdByMemberId(@Param("memberId") Long memberId);

    @Modifying
    @Query("delete from GroupMember g where g.mapId = :mapId")
    void deleteAllByMapId(@Param("mapId") Long mapId);
}
