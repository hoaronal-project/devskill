package com.devskill.common.exception;

public class EmailNotFoundException extends CoreException {

    public EmailNotFoundException() {
        super();
    }

    public EmailNotFoundException(Throwable cause) {
        super(cause);
    }

    public EmailNotFoundException(String message) {
        super(message);
    }

    public EmailNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
