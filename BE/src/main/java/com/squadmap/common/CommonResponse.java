package com.squadmap.common;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
public class CommonResponse<T> {

    private static final List<String> SUCCESS = List.of("OK");

    private final String code;
    private final List<String> messages;
    private final T data;

    public static <T> CommonResponse<T> success(String code, T data) {
        return new CommonResponse<>(code, SUCCESS, data);
    }

    public static CommonResponse<?> error(String code, List<String> errorMessages) {
        return new CommonResponse<>(code, errorMessages, null);
    }
}
