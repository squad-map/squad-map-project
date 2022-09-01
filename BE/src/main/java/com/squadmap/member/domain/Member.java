package com.squadmap.member.domain;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String avatarUrl;

    private String nickName;

    private String email;

    @Enumerated(EnumType.STRING)
    @Embedded
    private ResourceServer resourceServer;

    public static Member github(String avatarUrl, String nickName) {
        return new Member(null, avatarUrl, nickName, null, ResourceServer.GITHUB);
    }
}
