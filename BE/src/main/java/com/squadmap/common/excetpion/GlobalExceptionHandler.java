package com.squadmap.common.excetpion;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ClientException.class)
    public ResponseEntity<ErrorResponse> handleException(ClientException exception) {
        return new ResponseEntity<>(new ErrorResponse(exception.getMessage()), exception.getHttpStatus());
    }
}
