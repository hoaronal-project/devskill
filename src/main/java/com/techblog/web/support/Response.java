package com.techblog.web.support;

import com.fasterxml.jackson.annotation.JsonInclude;
import org.springframework.http.HttpStatus;

import java.io.Serializable;
import java.util.Map;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class Response<T extends Object> implements Serializable {

    private boolean isSuccess;
    private int status;
    private String messageCode;
    private String message;
    private Map<String, String> errorMessages;
    private T data;

    public Response(HttpStatus apiStatus, T data, Map<String, String> errorMessages) {

        if (apiStatus == null) {
            throw new IllegalArgumentException("APIStatus must not be null");
        }

        this.status = apiStatus.value();
        this.errorMessages = errorMessages;
        this.message = apiStatus.getReasonPhrase();
        this.data = data;
    }

    public Response(boolean isSuccess, HttpStatus apiStatus, T data, Map<String, String> errorMessages) {
        if (apiStatus == null) {
            throw new IllegalArgumentException("APIStatus must not be null");
        }
        this.status = apiStatus.value();
        this.errorMessages = errorMessages;
        this.message = apiStatus.getReasonPhrase();
        this.data = data;
        this.isSuccess = isSuccess;
    }

    public boolean isSuccess() {
        return isSuccess;
    }

    public void setSuccess(boolean success) {
        isSuccess = success;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getMessageCode() {
        return messageCode;
    }

    public void setMessageCode(String messageCode) {
        this.messageCode = messageCode;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Map<String, String> getErrorMessages() {
        return errorMessages;
    }

    public void setErrorMessages(Map<String, String> errorMessages) {
        this.errorMessages = errorMessages;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

}
