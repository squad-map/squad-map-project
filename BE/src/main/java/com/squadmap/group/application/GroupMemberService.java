package com.squadmap.group.application;

import com.squadmap.group.application.dto.GroupMemberInfo;

import java.util.List;

public interface GroupMemberService {

    List<GroupMemberInfo> searchMembersInGroup(Long LoginMemberId, Long memberId);

    void changeGroupMemberLevel(Long loginMemberId, Long mapId, Long memberId, String level);

    void addGroupMember(Long loginMemberId, Long mapId, Long memberId, String level);

    void removeGroupMember(Long loginMemberId, Long mapId, Long memberId);

    void checkHasReadLevel(Long mapId, Long memberId);

    void checkHasMaintainLevel(Long mapId, Long memberId);
}
