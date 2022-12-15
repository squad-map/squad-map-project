package com.squadmap.core.group.application;

import com.squadmap.core.group.application.dto.AccessInfo;
import com.squadmap.core.group.application.dto.GroupMemberInfo;
import com.squadmap.core.group.domain.PermissionLevel;

import java.util.List;

public interface GroupMemberService {

    List<GroupMemberInfo> searchMembersInGroup(Long LoginMemberId, Long memberId);

    void changeGroupMemberLevel(Long loginMemberId, Long mapId, Long memberId, String level);

    void addGroupMember(Long loginMemberId, Long mapId, Long memberId, String level);

    void removeGroupMember(Long loginMemberId, Long mapId, Long memberId);

    void checkHasReadLevel(Long mapId, Long memberId);

    void checkHasMaintainLevel(Long mapId, Long memberId);

    boolean hasRequiredLevel(AccessInfo accessInfo, PermissionLevel requiredLevel);
}
