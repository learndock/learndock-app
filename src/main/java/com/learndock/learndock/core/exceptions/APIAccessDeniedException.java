package com.learndock.learndock.core.exceptions;

public class APIAccessDeniedException extends Exception {

    public APIAccessDeniedException(String reason) {
        super("[DENIED] " + reason);
    }

}
