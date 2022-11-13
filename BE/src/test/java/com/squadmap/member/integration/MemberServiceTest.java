package com.squadmap.member.integration;

import com.squadmap.member.application.MemberService;
import com.squadmap.member.application.dto.MemberSimpleInfo;
import com.squadmap.IntegrationTest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class MemberServiceTest extends IntegrationTest {

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
