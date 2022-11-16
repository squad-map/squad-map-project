package com.squadmap.member.integration;

import com.squadmap.IntegrationTest;
import com.squadmap.member.application.MemberService;
import com.squadmap.member.application.dto.MemberSimpleInfo;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@IntegrationTest
class MemberServiceTest {

    @Autowired
    private MemberService memberService;


    @Test
    @DisplayName("멤버를 검색할 때, nickname의 일부로 검색할 수 있다.")
    void searchMemberByNickname() {

        String searchNickname = "ckna";

        List<MemberSimpleInfo> memberSimpleInfos = memberService.searchMemberByNickname(searchNickname);

        for (MemberSimpleInfo m : memberSimpleInfos) {
            assertThat(m.getNickname()).contains(searchNickname);
        }

    }
}
