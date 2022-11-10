package com.squadmap.common.excetpion;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class ErrorResponse<T> {

    private final T errorMessage;

}
