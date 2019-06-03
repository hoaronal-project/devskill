package com.devskill.common.utils;

import java.io.Serializable;
import java.util.Map;

public class CoreResponse implements Serializable {
    private boolean isSuccess;
    private String messageCode;
    private Integer responseCode;
    private Object paramObject;
    private Map<String, String> errorMessages;
    public CoreResponse() {
    }

    public CoreResponse(String message) {
        this.isSuccess = false;
        this.messageCode = message;
    }

    public CoreResponse(String message, boolean success) {
        this.messageCode = message;
        this.isSuccess = success;
    }

    public CoreResponse(Integer responseCode, boolean isSuccess, String messageCode) {
        this.responseCode = responseCode;
        this.isSuccess = isSuccess;
        this.messageCode = messageCode;
    }

    public CoreResponse(boolean isSuccess, String messageCode) {
        super();
        this.isSuccess = isSuccess;
        this.messageCode = messageCode;
    }

    public boolean getIsSuccess() {
        return isSuccess;
    }

    public void setSuccess(boolean success) {
        isSuccess = success;
    }

    public String getMessageCode() {
        return messageCode;
    }

    public void setMessageCode(String messageCode) {
        this.messageCode = messageCode;
    }

    public Integer getResponseCode() {
        return responseCode;
    }

    public void setResponseCode(Integer responseCode) {
        this.responseCode = responseCode;
    }

    public Object getParamObject() {
        return paramObject;
    }

    public void setParamObject(Object paramObject) {
        this.paramObject = paramObject;
    }

    public Map<String, String> getErrorMessages() {
        return errorMessages;
    }

    public void setErrorMessages(Map<String, String> errorMessages) {
        this.errorMessages = errorMessages;
    }
}