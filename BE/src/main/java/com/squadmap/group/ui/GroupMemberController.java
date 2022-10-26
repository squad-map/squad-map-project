package com.squadmap.group.ui;

import com.squadmap.common.auth.Login;
import com.squadmap.group.application.GroupMemberService;
import com.squadmap.group.application.dto.GroupMemberInfo;
import com.squadmap.group.domain.PermissionLevel;
import com.squadmap.group.ui.dto.AddMemberRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class GroupMemberController {

    private final GroupMemberService groupMemberService;

    @GetMapping("/groups/{mapId}")
    public List<GroupMemberInfo> searchMembersInMap(@Login Long memberId, @PathVariable Long mapId) {
        return groupMemberService.searchMembersInGroup(mapId, memberId);
    }

    @PostMapping("/groups/{mapId}")
    public void addMemberToGroup(@Login Long memberId, @PathVariable Long mapId, AddMemberRequest addMemberRequest) {
        groupMemberService.addGroupMember(memberId, mapId,
                        addMemberRequest.getMemberId(),
                        addMemberRequest.getPermissionLevel());
    }




}
