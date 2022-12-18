package com.squadmap.core.group.ui;

import com.squadmap.common.auth.Login;
import com.squadmap.common.dto.CommonResponse;
import com.squadmap.common.dto.SuccessCode;
import com.squadmap.core.group.application.GroupMemberService;
import com.squadmap.core.group.application.dto.GroupMemberSimpleInfo;
import com.squadmap.core.group.application.dto.GroupMemberInfo;
import com.squadmap.core.group.ui.dto.GroupMemberDeleteRequest;
import com.squadmap.core.group.ui.dto.GroupMemberRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class GroupMemberController {

    private final GroupMemberService groupMemberService;

    @GetMapping("/groups/{mapId}")
    public CommonResponse<List<GroupMemberInfo>> searchMembersInMap(@Login Long memberId, @PathVariable Long mapId) {
        return CommonResponse.success(SuccessCode.GROUP_READ, groupMemberService.searchMembersInGroup(mapId, memberId));
    }

    @PostMapping("/groups/{mapId}")
    public CommonResponse<GroupMemberSimpleInfo> addMemberToGroup(@Login Long memberId, @PathVariable Long mapId, @RequestBody @Valid GroupMemberRequest addMemberRequest) {
        GroupMemberSimpleInfo groupMemberSimpleInfo = groupMemberService.addGroupMember(memberId, mapId,
                addMemberRequest.getMemberId(),
                addMemberRequest.getPermissionLevel());

        return CommonResponse.success(SuccessCode.GROUP_CREATE, groupMemberSimpleInfo);
    }

    @PutMapping("/groups/{mapId}")
    public CommonResponse<GroupMemberSimpleInfo> updateMemberPermission(@Login Long memberId, @PathVariable Long mapId, @RequestBody @Valid GroupMemberRequest updateMemberRequest) {
        GroupMemberSimpleInfo groupMemberSimpleInfo = groupMemberService.changeGroupMemberLevel(memberId, mapId,
                updateMemberRequest.getMemberId(),
                updateMemberRequest.getPermissionLevel());

        return CommonResponse.success(SuccessCode.GROUP_UPDATE, groupMemberSimpleInfo);
    }

    @DeleteMapping("/groups/{mapId}")
    public CommonResponse<Void> deleteMemberInGroup(@Login Long memberId, @PathVariable Long mapId, @RequestBody @Valid GroupMemberDeleteRequest deleteRequest) {
        groupMemberService.removeGroupMember(memberId, mapId, deleteRequest.getMemberId());
        return CommonResponse.emptyData(SuccessCode.GROUP_DELETE);
    }


}
