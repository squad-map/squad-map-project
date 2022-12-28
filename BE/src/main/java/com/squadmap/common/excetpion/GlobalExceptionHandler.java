package com.squadmap.common.excetpion;

import com.squadmap.common.dto.CommonResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final String FIELD_ERROR_FORMAT = "%s : %s";

    @ExceptionHandler(ClientException.class)
    public ResponseEntity<CommonResponse<?>> handleClientException(ClientException exception) {
        CommonResponse<?> response = CommonResponse.error(exception.getCode(), exception.getMessage(), null);
        return new ResponseEntity<>(response, exception.getHttpStatus());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<CommonResponse<?>> handleNotValidException(MethodArgumentNotValidException exception) {
        BindingResult bindingResult = exception.getBindingResult();
        List<String> errorMessages = bindingResult.getFieldErrors()
                .stream()
                .map(fieldError -> String.format(FIELD_ERROR_FORMAT,
                        fieldError.getField(),
                        fieldError.getDefaultMessage())).collect(Collectors.toUnmodifiableList());

        CommonResponse<List<String>> errorResponse = CommonResponse.error(ErrorStatusCodeAndMessage.REQUEST_FIELD_NOT_VALID.getCode(),
                ErrorStatusCodeAndMessage.REQUEST_FIELD_NOT_VALID.getMessage(), errorMessages);
        return new ResponseEntity<>(errorResponse, ErrorStatusCodeAndMessage.REQUEST_FIELD_NOT_VALID.getHttpStatus());
    }
}
