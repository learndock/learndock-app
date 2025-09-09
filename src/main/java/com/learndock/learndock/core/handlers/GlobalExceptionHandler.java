package com.learndock.learndock.core.handlers;

import com.learndock.learndock.core.exceptions.APIAccessDeniedException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(APIAccessDeniedException.class)
    public ResponseEntity<String> handleAccessDeniedException(APIAccessDeniedException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.UNAUTHORIZED);
    }
}