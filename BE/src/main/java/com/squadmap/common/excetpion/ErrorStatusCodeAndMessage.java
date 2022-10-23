package com.squadmap.common.excetpion;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@RequiredArgsConstructor
@Getter
public enum ErrorStatusCodeAndMessage {

    NO_SUCH_MEMBER(HttpStatus.NO_CONTENT, "등록된 회원이 아닙니다."),
    NO_SUCH_MAP(HttpStatus.NO_CONTENT, "등록된 지도가 아닙니다."),
    UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "접근 권한이 없습니다"),
    NO_SUCH_PLACE(HttpStatus.NO_CONTENT, "등록된 장소가 아닙니다."),
    NO_SUCH_CATEGORY(HttpStatus.NO_CONTENT, "등록된 카테고리가 아닙니다."),
    ALREADY_REGISTERED_PLACE(HttpStatus.CONFLICT, "지도 내에 이미 등록되어 있습니다."),
    NOT_LOGGED_IN(HttpStatus.UNAUTHORIZED, "로그인이 필요한 서비스입니다."),
    EXPIRED_TOKEN(HttpStatus.UNAUTHORIZED, "토큰이 만료되었습니다."),
    DUPLICATE_CATEGORY(HttpStatus.CONFLICT, "지도 내에 카테고리가 중복됩니다."),
    NO_SUCH_GROUP_MEMBER(HttpStatus.NO_CONTENT, "그룹에 속한 회원이 아닙니다."),
    UNIQUE_HOST(HttpStatus.UNAUTHORIZED, "지도의 HOST 권한은 지도 생성자만 가능합니다.");

    private final HttpStatus httpStatus;
    private final String message;
}
