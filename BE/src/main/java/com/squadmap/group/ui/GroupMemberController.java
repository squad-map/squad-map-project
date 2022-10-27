package com.squadmap.group.ui;

import com.squadmap.common.auth.Login;
import com.squadmap.group.application.GroupMemberService;
import com.squadmap.group.application.dto.GroupMemberInfo;
import com.squadmap.group.ui.dto.GroupMemberDeleteRequest;
import com.squadmap.group.ui.dto.GroupMemberRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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
    public void addMemberToGroup(@Login Long memberId, @PathVariable Long mapId, @RequestBody GroupMemberRequest addMemberRequest) {
        groupMemberService.addGroupMember(memberId, mapId,
                        addMemberRequest.getMemberId(),
                        addMemberRequest.getPermissionLevel());
    }

    @PutMapping("/groups/{mapId}")
    public void updateMemberPermission (@Login Long memberId, @PathVariable Long mapId, @RequestBody GroupMemberRequest updateMemberRequest) {
        groupMemberService.changeGroupMemberLevel(memberId, mapId,
                updateMemberRequest.getMemberId(),
                updateMemberRequest.getPermissionLevel());
    }

    @DeleteMapping("/groups/{mapId}")
    public void deleteMemberInGroup(@Login Long memberId, @PathVariable Long mapId, @RequestBody GroupMemberDeleteRequest deleteRequest) {
        groupMemberService.removeGroupMember(memberId, mapId, deleteRequest.getMemberId());
    }





}
