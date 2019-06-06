package com.devskill.common.exception;

public class DuplicateNameException extends CoreException {

    private String name;

    public DuplicateNameException(String name) {
        super();
        this.name = name;
    }

    public DuplicateNameException(String name, Throwable cause) {
        super(cause);
        this.name = name;
    }

    public DuplicateNameException(String name, String message) {
        super(message);
        this.name = name;
    }

    public DuplicateNameException(String name, String message, Throwable cause) {
        super(message, cause);
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
