package com.squadmap.group.domain;

import com.squadmap.common.excetpion.ClientException;
import com.squadmap.common.excetpion.ErrorStatusCodeAndMessage;
import com.squadmap.core.group.domain.GroupMember;
import com.squadmap.core.group.domain.PermissionLevel;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.*;


class GroupMemberTest {

    private GroupMember host;
    private GroupMember maintain;
    private GroupMember read;

    @BeforeEach
    void setUp() {
        host = GroupMember.of(1L, 1L, "HOST");
        maintain = GroupMember.of(1L, 2L, "MAINTAIN");
        read = GroupMember.of(1L, 3L, "READ");
    }

    @Test
    void updatePermissionLevel_success_maintain_to_read_and_read_to_maintain() {
        maintain.updatePermissionLevel("READ");
        read.updatePermissionLevel("MAINTAIN");

        assertThat(maintain.getPermissionLevel().equals(PermissionLevel.READ));
        assertThat(maintain.getPermissionLevel().equals(PermissionLevel.MAINTAIN));
    }
    @Test
    void updatePermissionLevel_fail_host_to_other_level() {

        assertThatThrownBy(() -> host.updatePermissionLevel("MAINTAIN"))
                .isInstanceOf(ClientException.class)
                .hasMessage(ErrorStatusCodeAndMessage.HOST_IMMUTABLE.getMessage());

        assertThatThrownBy(() -> host.updatePermissionLevel("READ"))
                .isInstanceOf(ClientException.class)
                .hasMessage(ErrorStatusCodeAndMessage.HOST_IMMUTABLE.getMessage());
    }

    @Test
    void updatePermissionLevel_fail_other_level_to_host() {

        assertThatThrownBy(() -> maintain.updatePermissionLevel("HOST"))
                .isInstanceOf(ClientException.class)
                .hasMessage(ErrorStatusCodeAndMessage.UNIQUE_HOST.getMessage());

        assertThatThrownBy(() -> read.updatePermissionLevel("HOST"))
                .isInstanceOf(ClientException.class)
                .hasMessage(ErrorStatusCodeAndMessage.UNIQUE_HOST.getMessage());
    }

    @Test
    void hasRequiredPermission_host() {

        assertThat(host.hasRequiredPermission(PermissionLevel.READ)).isTrue();
        assertThat(host.hasRequiredPermission(PermissionLevel.MAINTAIN)).isTrue();
        assertThat(host.hasRequiredPermission(PermissionLevel.HOST)).isTrue();
    }

    @Test
    void hasRequiredPermission_maintain() {

        assertThat(maintain.hasRequiredPermission(PermissionLevel.READ)).isTrue();
        assertThat(maintain.hasRequiredPermission(PermissionLevel.MAINTAIN)).isTrue();
        assertThat(maintain.hasRequiredPermission(PermissionLevel.HOST)).isFalse();
    }

    @Test
    void hasRequiredPermission_read() {

        assertThat(read.hasRequiredPermission(PermissionLevel.READ)).isTrue();
        assertThat(read.hasRequiredPermission(PermissionLevel.MAINTAIN)).isFalse();
        assertThat(read.hasRequiredPermission(PermissionLevel.HOST)).isFalse();
    }
}
