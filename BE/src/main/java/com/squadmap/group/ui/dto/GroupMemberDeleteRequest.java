package com.squadmap.group.ui.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class GroupMemberDeleteRequest {

    @NotNull
    private Long memberId;
}
