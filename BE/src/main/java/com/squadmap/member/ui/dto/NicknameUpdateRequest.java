package com.squadmap.member.ui.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class NicknameUpdateRequest {

    @NotBlank
    @Size(min = 1, max = 15)
    private String nickname;

}
