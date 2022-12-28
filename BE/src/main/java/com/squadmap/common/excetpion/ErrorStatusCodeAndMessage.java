package com.squadmap.common.excetpion;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@RequiredArgsConstructor
@Getter
public enum ErrorStatusCodeAndMessage {

    NO_SUCH_MEMBER("MM-F01", HttpStatus.NO_CONTENT, "등록된 회원이 아닙니다."),
    OUT_OF_LIMIT_NICKNAME_LENGTH("MM-F02", HttpStatus.BAD_REQUEST, "사용자의 닉네임은 한글자 이상, 열다섯자 이하이어야 합니다."),
    ALREADY_REGISTERED_GROUP_MEMBER("MM-F03", HttpStatus.CONFLICT, "이미 등록된 회원입니다."),

    NO_SUCH_MAP("M-F01", HttpStatus.NO_CONTENT, "등록된 지도가 아닙니다."),

    NOT_LOGGED_IN("A-F01", HttpStatus.UNAUTHORIZED, "로그인이 필요한 서비스입니다."),
    EXPIRED_TOKEN("A-F02", HttpStatus.UNAUTHORIZED, "토큰이 만료되었습니다."),
    NAVER_LOGIN_ERROR("A-F03", HttpStatus.BAD_REQUEST, "NAVER 로그인에 실패하였습니다."),
    GITHUB_LOGIN_ERROR("A-F04", HttpStatus.BAD_REQUEST, "GITHUB 로그인에 실패하였습니다."),

    NO_SUCH_PLACE("P-F01", HttpStatus.NO_CONTENT, "등록된 장소가 아닙니다."),
    ALREADY_REGISTERED_PLACE("P-F02", HttpStatus.CONFLICT, "지도 내에 이미 등록되어 있습니다."),

    NO_SUCH_CATEGORY("C-F01", HttpStatus.NO_CONTENT, "등록된 카테고리가 아닙니다."),
    DUPLICATE_CATEGORY("C-F02", HttpStatus.CONFLICT, "지도 내에 카테고리가 중복됩니다."),
    CATEGORY_HAS_PLACE("C-F03", HttpStatus.CONFLICT, "카테고리에 포함된 장소가 있습니다. 해당 카테고리에 등록된 지도가 있다면 삭제할 수 없습니다."),

    FORBIDDEN("G-F01", HttpStatus.FORBIDDEN, "접근 권한이 없습니다"),
    NO_SUCH_GROUP_MEMBER("G-F02", HttpStatus.NO_CONTENT, "그룹에 속한 회원이 아닙니다."),
    UNIQUE_HOST("G-F03", HttpStatus.CONFLICT, "지도의 HOST 권한은 지도 생성자만 가능합니다."),

    HOST_IMMUTABLE("G-F04", HttpStatus.CONFLICT, "지도의 HOST는 변경될 수 없습니다."),

    OUT_OF_LIMIT_COMMENT_LENGTH("CM-F01", HttpStatus.BAD_REQUEST, "댓글은 1~150자 이내로만 작성할 수 있습니다."),
    NO_SUCH_COMMENT("CM-F02", HttpStatus.NO_CONTENT, "등록된 댓글이 없습니다."),

    REQUEST_FIELD_NOT_VALID("NV-F01", HttpStatus.BAD_REQUEST, "잘못된 요청입니다. 요청 필드를 확인해주세요.");


    private final String code;
    private final HttpStatus httpStatus;
    private final String message;
}
