package com.squadmap.group.ui;

import com.squadmap.common.auth.Login;
import com.squadmap.group.application.GroupMemberService;
import com.squadmap.group.application.dto.GroupMemberInfo;
import com.squadmap.map.application.MapService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class GroupMemberController {

    private final GroupMemberService groupMemberService;

    @GetMapping("/groups/{mapId}")
    List<GroupMemberInfo> searchMembersInMap(@Login Long memberId, @PathVariable Long mapId) {
        return groupMemberService.searchMembersInGroup(mapId, memberId);
    }
}
