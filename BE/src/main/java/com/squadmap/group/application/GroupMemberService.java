package com.squadmap.group.application;

import com.squadmap.group.application.dto.GroupMemberInfo;
import com.squadmap.group.domain.PermissionLevel;

import java.util.List;

public interface GroupMemberService {

    List<GroupMemberInfo> searchMembersInGroup(Long LoginMemberId, Long memberId);

    void changeGroupMemberLevel(Long loginMemberId, Long mapId, Long memberId, String level);

    void addGroupMember(Long loginMemberId, Long mapId, Long memberId, String level);

    void removeGroupMember(Long loginMemberId, Long mapId, Long memberId);

    void checkHasAuthority(Long mapId, Long memberId, PermissionLevel permissionLevel);
}
