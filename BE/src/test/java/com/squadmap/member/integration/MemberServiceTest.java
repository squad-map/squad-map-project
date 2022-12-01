package com.squadmap.member.integration;

import com.squadmap.IntegrationTest;
import com.squadmap.common.excetpion.ClientException;
import com.squadmap.common.excetpion.ErrorStatusCodeAndMessage;
import com.squadmap.member.application.MemberService;
import com.squadmap.member.application.dto.MemberSimpleInfo;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static org.assertj.core.api.Assertions.*;
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

    @ParameterizedTest
    @ValueSource(strings = {"n", "updatedNickname"})
    @DisplayName("사용자는 닉네임을 업데이트할 수 있다.")
    void updateNicknameTest(String nickname) {

        Long memberId = 1L;
        String updatedNickname = memberService.updateNickname(memberId, nickname);

        assertThat(nickname).isEqualTo(updatedNickname);
    }

    @ParameterizedTest
    @ValueSource(strings = {"", " ", "    ", "updatedNicknameupdatedNickname"})
    @DisplayName("사용자의 닉네임은 한글자 이상, 열다섯자 이상이거나  업데이트 할때 익셉션이 발생한다.")
    void updateNicknameTest_size_limit_fail(String nickname) {

        Long memberId = 1L;

        assertThatThrownBy(() -> memberService.updateNickname(memberId, nickname))
                .isInstanceOf(ClientException.class)
                .hasMessage(ErrorStatusCodeAndMessage.OUT_OF_LIMIT_NICKNAME_LENGTH.getMessage());

    }
}
