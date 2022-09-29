package com.squadmap.member.ui;

import com.squadmap.common.auth.Login;
import com.squadmap.member.application.MemberService;
import com.squadmap.member.ui.dto.NicknameUpdateRequest;
import com.squadmap.member.ui.dto.NicknameUpdateResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
@Slf4j
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/update")
    public NicknameUpdateResponse updateMemberNickname(@Login Long memberId, @RequestBody NicknameUpdateRequest nicknameUpdateRequest) {
        String nickname = memberService.updateNickname(memberId, nicknameUpdateRequest.getNickname());
        return new NicknameUpdateResponse(nickname);
    }
}
