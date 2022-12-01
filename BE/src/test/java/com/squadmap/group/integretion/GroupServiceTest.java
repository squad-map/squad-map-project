package com.squadmap.group.integretion;

import com.squadmap.IntegrationTest;
import com.squadmap.common.excetpion.ClientException;
import com.squadmap.common.excetpion.ErrorStatusCodeAndMessage;
import com.squadmap.core.group.application.GroupMemberService;
import com.squadmap.core.group.application.dto.GroupMemberInfo;
import com.squadmap.core.group.infrastructure.GroupMemberRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static org.assertj.core.api.Assertions.*;


@IntegrationTest
class GroupServiceTest {

    @Autowired
    private GroupMemberService groupService;

    @Autowired
    private GroupMemberRepository groupMemberRepository;

    @Test
    @DisplayName("지도의 권한이 있는 사용자는 지도의 아이디로 그룹에 속한 회원들을 조회할 수 있다.")
    void searchMembersInGroupTest() {

        Long mapId = 1L;
        Long memberId = 1L;

        List<GroupMemberInfo> groupMembers = groupService.searchMembersInGroup(mapId, memberId);

        assertThat(groupMembers.size()).isPositive();
    }

    @Test
    @DisplayName("지도의 권한이 없는 사용자가 지도의 그룹에 속한 회원들을 조회하면 익셉션이 발생한다.")
    void searchMembersInGroupTest_no_groupmember_fail() {

        Long mapId = 1L;
        Long memberId = 4L;

        assertThatThrownBy(() -> groupService.searchMembersInGroup(mapId, memberId))
                .isInstanceOf(ClientException.class)
                .hasMessage(ErrorStatusCodeAndMessage.FORBIDDEN.getMessage());

    }

    @Test
    @DisplayName("지도의 주인이라면, 지도에 그룹멤버를 추가할 수 있다.")
    void saveGroupMemberTest() {

        Long mapId = 1L;
        Long loginMemberId = 1L;
        Long memberId = 4L;
        String level = "MAINTAIN";

        groupService.addGroupMember(loginMemberId ,mapId, memberId, level);

        assertThat(groupMemberRepository.findByMapIdAndMemberId(mapId, memberId)).isPresent();
    }

    @Test
    @DisplayName("지도의 주인이 아닌 사용자가, 지도에 그룹멤버를 추가하면 익셉션이 발생한다.")
    void saveGroupMemberTest_not_host_fail() {

        Long mapId = 1L;
        Long loginMemberId = 2L;
        Long memberId = 4L;
        String level = "MAINTAIN";

        assertThatThrownBy(() -> groupService.addGroupMember(loginMemberId ,mapId, memberId, level))
                .isInstanceOf(ClientException.class)
                .hasMessage(ErrorStatusCodeAndMessage.FORBIDDEN.getMessage());

    }

    @Test
    @DisplayName("지도의 주인이 다른 사용자에게 HOST 권한을 부여하면 익셉션이 발생한다.")
    void saveGroupMemberTest_other_member_give_host_fail() {

        Long mapId = 1L;
        Long loginMemberId = 1L;
        Long memberId = 4L;
        String level = "HOST";


        assertThatThrownBy(() -> groupService.addGroupMember(loginMemberId ,mapId, memberId, level))
                .isInstanceOf(ClientException.class)
                .hasMessage(ErrorStatusCodeAndMessage.UNIQUE_HOST.getMessage());

    }
}
