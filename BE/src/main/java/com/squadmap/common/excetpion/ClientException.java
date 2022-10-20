package com.squadmap.common.excetpion;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ClientException extends RuntimeException {

    private final HttpStatus httpStatus;

    public ClientException(ErrorStatusCodeAndMessage errorStatusCodeAndMessage) {
        super(errorStatusCodeAndMessage.getMessage());
        this.httpStatus = errorStatusCodeAndMessage.getHttpStatus();
    }
}
