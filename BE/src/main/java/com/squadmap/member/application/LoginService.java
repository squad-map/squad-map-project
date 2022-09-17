package com.squadmap.member.application;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.squadmap.member.application.dto.LoginInfo;
import com.squadmap.member.application.dto.MemberInfo;
import com.squadmap.member.application.dto.Tokens;
import com.squadmap.member.domain.Member;
import com.squadmap.member.infrastructure.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.net.http.HttpClient;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class LoginService {

    private final OauthService oauthService;
    private final JwtProvider jwtProvider;
    private final MemberRepository memberRepository;

    @Transactional
    public LoginInfo login(String provider, String code, String state) {

        MemberInfo memberInfo = oauthService.oauth(provider, code, state);
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