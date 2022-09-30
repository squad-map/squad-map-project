package com.squadmap.common.auth.application;

import com.squadmap.common.auth.application.dto.LoginInfo;
import com.squadmap.common.auth.application.dto.LoginMember;
import com.squadmap.common.auth.application.dto.MemberInfo;
import com.squadmap.common.auth.application.dto.Tokens;
import com.squadmap.member.domain.Member;
import com.squadmap.member.infrastructure.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class LoginService {

    private final OauthService oauthService;
    private final JwtProvider jwtProvider;
    private final MemberRepository memberRepository;

    @Transactional
    public LoginInfo login(String provider, String code, String state) {

        MemberInfo memberInfo = oauthService.oauth(provider, code, state);
        Member member = memberRepository.findByEmail(memberInfo.getEmail())
                .orElseGet(() -> memberRepository
                        .save(new Member(memberInfo.getNickname(), memberInfo.getEmail(), memberInfo.getProfileImageUrl(), provider)));

        return new LoginInfo(
                member.getId(),
                member.getNickname(),
                member.getProfileImage(),
                new Tokens(jwtProvider.generateAccessToken(member.getId()),
                jwtProvider.generateRefreshToken(member.getId()))
        );
    }

    public boolean isLoginUser(String token) {
        return jwtProvider.validateToken(token);
    }


}
