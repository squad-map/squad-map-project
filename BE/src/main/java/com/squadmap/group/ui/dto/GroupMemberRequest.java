package com.squadmap.group.ui.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class GroupMemberRequest {

    @NotNull
    private Long memberId;
    @NotBlank
    private String permissionLevel;
}
