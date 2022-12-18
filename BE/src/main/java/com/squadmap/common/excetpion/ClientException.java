package com.squadmap.common.excetpion;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ClientException extends RuntimeException {

    private final HttpStatus httpStatus;
    private final String code;

    public ClientException(ErrorStatusCodeAndMessage errorStatusCodeAndMessage) {
        super(errorStatusCodeAndMessage.getMessage());
        this.code = errorStatusCodeAndMessage.getCode();
        this.httpStatus = errorStatusCodeAndMessage.getHttpStatus();
    }
}
