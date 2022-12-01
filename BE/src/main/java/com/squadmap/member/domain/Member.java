package com.squadmap.member.domain;

import com.squadmap.common.excetpion.ClientException;
import com.squadmap.common.excetpion.ErrorStatusCodeAndMessage;
import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@ToString
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nickname;
    private String email;
    private String profileImage;

    @Enumerated(value = EnumType.STRING)
    private ResourceServer resourceServer;

    public Member(String nickname, String email, String profileImage, String resourceServer) {
        this.nickname = nickname;
        this.email = email;
        this.profileImage = profileImage;
        this.resourceServer = ResourceServer.valueOf(resourceServer.toUpperCase());
    }

    public String updateNickname(final String nickname) {
        int nicknameLength = nickname.length();
        if(nickname.isBlank() || nicknameLength > 15) {
            throw new ClientException(ErrorStatusCodeAndMessage.OUT_OF_LIMIT_NICKNAME_LENGTH);
        }
        this.nickname = nickname;
        return this.nickname;
    }


}
