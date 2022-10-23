package com.squadmap.group.domain.application;


import com.squadmap.common.auth.application.dto.MemberInfo;

import java.util.List;

public interface GroupService {

    List<MemberInfo> searchMembersInGroup(Long mapId);
}
