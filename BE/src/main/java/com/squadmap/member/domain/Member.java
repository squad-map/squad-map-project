package com.squadmap.member.domain;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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

    public Member(String avatarUrl, String nickName, String email, String resourceServer) {
        this.avatarUrl = avatarUrl;
        this.nickName = nickName;
        this.email = email;
        this.resourceServer = ResourceServer.valueOf(resourceServer.toUpperCase());
    }
}
