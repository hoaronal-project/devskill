package com.devskill.common.utils;

import com.devskill.web.support.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class ResponseUtils {

    private Response createResponse(HttpStatus apiStatus, Object data, Map<String, String> errorMessages) {
        return new Response(apiStatus, data, errorMessages);
    }

    public ResponseEntity<Response> buildResponse(HttpStatus apiStatus, Object data, HttpStatus httpStatus, Map<String, String> errorMessages) {
        return new ResponseEntity(createResponse(apiStatus, data, errorMessages), httpStatus);
    }

    public ResponseEntity<Response> successResponse(Object data, Map<String, String> errorMessages) {
        return buildResponse(HttpStatus.OK, data, HttpStatus.OK, errorMessages);
    }

    public ResponseEntity<Response> errorResponse(Object data, Map<String, String> errorMessages) {
        return buildResponse(HttpStatus.BAD_REQUEST, data, HttpStatus.BAD_REQUEST, errorMessages);
    }

    public ResponseEntity<Response> badRequestResponse(Map<String, String> errMap, Map<String, String> errorMessages) {
        return buildResponse(HttpStatus.BAD_REQUEST, errMap, HttpStatus.BAD_REQUEST, errorMessages);
    }
}
