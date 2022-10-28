package com.squadmap.member.application;

import com.squadmap.common.auth.application.dto.MemberInfo;
import com.squadmap.member.application.dto.MemberSimpleInfo;

import java.util.List;

public interface MemberService {

    String updateNickname(Long memberId, String nickname);

    List<MemberSimpleInfo> searchMemberByNickname(String nickname);
}
