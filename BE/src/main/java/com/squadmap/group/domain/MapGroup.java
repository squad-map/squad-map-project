package com.squadmap.group.domain;

import com.squadmap.map.domain.Map;
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
public class Group {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long mapId;

    private Long memberId;

    @Enumerated
    private PermissionLevel permissionLevel;

    public static Group of(Long mapId, Long memberId, String level) {
        return new Group(null, mapId, memberId, PermissionLevel.valueOf(level));
    }

    public void editPermissionLevel(String level) {
        this.permissionLevel = PermissionLevel.valueOf(level);
    }

}
