package com.squadmap.group.domain;

import com.squadmap.common.excetpion.ClientException;
import com.squadmap.common.excetpion.ErrorStatusCodeAndMessage;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
@Table(uniqueConstraints = {
        @UniqueConstraint(columnNames = {"mapId", "memberId"})
})
public class GroupMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long mapId;

    private Long memberId;

    @Enumerated(EnumType.STRING)
    private PermissionLevel permissionLevel;

    public static GroupMember of(Long mapId, Long memberId, String level) {
        return new GroupMember(null, mapId, memberId, PermissionLevel.valueOf(level));
    }

    public void updatePermissionLevel(String level) {
        PermissionLevel permissionLevel = PermissionLevel.valueOf(level);
        if (permissionLevel.equals(PermissionLevel.HOST)) {
            throw new ClientException(ErrorStatusCodeAndMessage.UNIQUE_HOST);
        }
        this.permissionLevel = permissionLevel;
    }

    public boolean hasRequiredPermission(PermissionLevel permissionLevel) {
        if (this.permissionLevel.equals(PermissionLevel.READ) &&
                (permissionLevel.equals(PermissionLevel.MAINTAIN) || permissionLevel.equals(PermissionLevel.HOST))) {
            return false;
        }

        if (this.permissionLevel.equals(PermissionLevel.MAINTAIN) && permissionLevel.equals(PermissionLevel.HOST)) {
            return false;
        }

        return true;
    }

}
