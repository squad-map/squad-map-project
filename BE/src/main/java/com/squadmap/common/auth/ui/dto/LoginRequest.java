package com.squadmap.common.auth.ui.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@AllArgsConstructor
@Getter
public class LoginRequest {

    private String code;
    private String state;

}
