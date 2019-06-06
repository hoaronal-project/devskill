package com.devskill.common.exception;

public class DuplicateCodeException extends CoreException {

    private String code;

    public DuplicateCodeException(String code) {
        super();
        this.code = code;
    }

    public DuplicateCodeException(String code, Throwable cause) {
        super(cause);
        this.code = code;
    }

    public DuplicateCodeException(String code, String message) {
        super(message);
        this.code = code;
    }

    public DuplicateCodeException(String code, String message, Throwable cause) {
        super(message, cause);
        this.code = code;
    }

    public String getCode() {
        return code;
    }
}
