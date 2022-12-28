package com.squadmap.member.application;

import com.squadmap.member.application.dto.MemberSimpleInfo;
import com.squadmap.member.application.dto.NicknameUpdateInfo;

import java.util.List;

public interface MemberService {

    NicknameUpdateInfo updateNickname(Long memberId, String nickname);

    List<MemberSimpleInfo> searchMemberByNickname(String nickname);
}
