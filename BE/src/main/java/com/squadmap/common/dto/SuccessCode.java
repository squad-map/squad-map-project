package com.squadmap.common.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum SuccessCode {

    LOGIN_GITHUB("A-S01"),
    LOGIN_NAVER("A-S02"),
    REISSUE_TOKEN("A-S03"),

    MAP_CREATE("M-S01"),
    MAP_READ_DETAIL("M-S02"),
    MAP_READ_PUB("M-S03"),
    MAP_READ_PRI("M-S04"),
    MAP_UPDATE("M-S05"),
    MAP_DELETE("M-S06"),

    PLACE_CREATE("P-S01"),
    PLACE_UPDATE("P-S02"),
    PLACE_READ("P-S03"),

    CATEGORY_CREATE("C-S01"),
    CATEGORY_READ("C-S02"),
    CATEGORY_READ_ALL("C-S03"),
    CATEGORY_UPDATE("C-S04"),
    CATEGORY_DELETE("C-S05"),

    COMMENT_CREATE("CM-S01"),
    COMMENT_READ("CM-S02"),
    COMMENT_UPDATE("CM-S03"),
    COMMENT_DELETE("CM-S04"),

    GROUP_CREATE("G-S01"),
    GROUP_UPDATE("G-S02"),
    GROUP_READ("G-S03"),
    GROUP_DELETE("G-S04");

    private final String code;

}
