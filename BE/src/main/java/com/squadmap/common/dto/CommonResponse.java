package com.squadmap.common.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
@Getter
public class CommonResponse<T> {

    private static final String SUCCESS = "OK";

    private final String code;
    private final String message;
    private final T data;

    public static <T> CommonResponse<T> success(SuccessCode successCode, T data) {
        return new CommonResponse<>(successCode.getCode(), SUCCESS, data);
    }

    public static <T> CommonResponse<T> error(String errorCode, String message, T data) {
        return new CommonResponse<>(errorCode, message, data);
    }

    public static CommonResponse<Void> emptyData(SuccessCode successCode) {
        return new CommonResponse<>(successCode.getCode(), SUCCESS, null);
    }
}
