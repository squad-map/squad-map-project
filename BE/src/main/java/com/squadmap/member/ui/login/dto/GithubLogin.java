package com.squadmap.member.ui.login.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@AllArgsConstructor
@Getter
public class GithubLogin {

    private String code;
    private String state;

}
