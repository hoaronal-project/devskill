package com.devskill.common.exception;

import org.hibernate.service.spi.ServiceException;

public class DuplicateEmailException extends CoreException {

	private String code;

	public DuplicateEmailException(String code) {
		super();
		this.code = code;
	}

	public DuplicateEmailException(String code, Throwable cause) {
		super(cause);
		this.code = code;
	}

	public DuplicateEmailException(String code, String message) {
		super(message);
		this.code = code;
	}

	public DuplicateEmailException(String code, String message, Throwable cause) {
		super(message, cause);
		this.code = code;
	}

	public String getCode() {
		return code;
	}
}
