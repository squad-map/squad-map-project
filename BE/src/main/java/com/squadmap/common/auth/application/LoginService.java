package com.squadmap.common.auth.application;

import com.squadmap.common.auth.application.dto.LoginInfo;
import com.squadmap.common.auth.application.dto.LoginMember;
import com.squadmap.common.auth.application.dto.Tokens;
import com.squadmap.member.domain.Member;
import com.squadmap.member.infrastructure.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class LoginService {

    private final OauthService oauthService;
    private final JwtProvider jwtProvider;
    private final MemberRepository memberRepository;

    @Transactional
    public LoginInfo login(String provider, String code, String state) {

        LoginMember memberInfo = oauthService.oauth(provider, code, state);
        Member member = memberRepository.findByNickName(memberInfo.getNickname())
                .orElseGet(() -> memberRepository
                        .save(new Member(memberInfo.getAvatarUrl(), memberInfo.getNickname(), memberInfo.getEmail(), provider)));

        return new LoginInfo(
                member.getId(),
                member.getNickName(),
                member.getAvatarUrl(),
                new Tokens(jwtProvider.generateAccessToken(member.getId()),
                jwtProvider.generateRefreshToken(member.getId()))
        );
    }


}
