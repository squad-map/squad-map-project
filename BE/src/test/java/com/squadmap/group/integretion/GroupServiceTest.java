package com.squadmap.group.integretion;

import com.squadmap.IntegrationTest;
import com.squadmap.group.application.GroupMemberService;
import com.squadmap.group.application.dto.GroupMemberInfo;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;


@IntegrationTest
class GroupServiceTest {

    @Autowired
    private GroupMemberService groupService;

    @Test
    @DisplayName("지도의 아이디로 그룹에 속한 회원들을 조회할 수 있다.")
    void searchMembersInGroupTest() {

        Long mapId = 1L;
        Long memberId = 1L;

        List<GroupMemberInfo> groupMembers = groupService.searchMembersInGroup(mapId, memberId);

        assertThat(groupMembers.size()).isPositive();
    }
}
