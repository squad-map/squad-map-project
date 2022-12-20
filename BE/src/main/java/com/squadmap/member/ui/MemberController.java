package com.squadmap.member.ui;

import com.squadmap.common.auth.Login;
import com.squadmap.common.dto.CommonResponse;
import com.squadmap.common.dto.SuccessCode;
import com.squadmap.member.application.MemberService;
import com.squadmap.member.application.dto.MemberSimpleInfo;
import com.squadmap.member.ui.dto.NicknameUpdateRequest;
import com.squadmap.member.application.dto.NicknameUpdateInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
@Slf4j
public class MemberController {

    private final MemberService memberService;

    @PatchMapping
    public CommonResponse<NicknameUpdateInfo> updateMemberNickname(@Login Long memberId, @RequestBody @Valid NicknameUpdateRequest nicknameUpdateRequest) {
        NicknameUpdateInfo nicknameUpdateInfo = memberService.updateNickname(memberId, nicknameUpdateRequest.getNickname());
        return CommonResponse.success(SuccessCode.MEMBER_UPDATE, nicknameUpdateInfo);
    }

    // slice로 수정 필요
    @GetMapping
    public CommonResponse<List<MemberSimpleInfo>> searchMembersByNickname(String nickname) {
        return CommonResponse.success(SuccessCode.MEMBER_READ_SEARCH, memberService.searchMemberByNickname(nickname));
    }
}
