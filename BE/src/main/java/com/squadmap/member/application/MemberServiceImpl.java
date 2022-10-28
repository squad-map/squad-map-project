package com.squadmap.member.application;

import com.squadmap.common.auth.application.dto.MemberInfo;
import com.squadmap.common.excetpion.ClientException;
import com.squadmap.common.excetpion.ErrorStatusCodeAndMessage;
import com.squadmap.member.application.dto.MemberSimpleInfo;
import com.squadmap.member.domain.Member;
import com.squadmap.member.infrastructure.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

    @Override
    @Transactional
    public String updateNickname(Long memberId, String nickname) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new ClientException(ErrorStatusCodeAndMessage.NO_SUCH_MEMBER));

        return member.updateNickname(nickname);
    }

    @Override
    public List<MemberSimpleInfo> searchMemberByNickname(String nickname) {

        return memberRepository.findAllByNicknameContaining(nickname)
                .stream()
                .map(m -> new MemberSimpleInfo(m.getId(), m.getNickname(), m.getProfileImage()))
                .collect(Collectors.toUnmodifiableList());
    }
}
