package com.techblog.web.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;

@Controller
public class ErrorHandlingController  implements ErrorController {

        @GetMapping(value = "/error")
        public String handleError(Model model, HttpServletRequest request) {
                String errorMsg = "";
                int httpErrorCode = getErrorCode(request);

                switch (httpErrorCode) {
                        case 400: {
                                model.addAttribute("errorCode", HttpStatus.BAD_REQUEST.value());
                                errorMsg = "Http Error Code: 400. Bad Request";
                                break;
                        }
                        case 401: {
                                model.addAttribute("errorCode", HttpStatus.UNAUTHORIZED.value());
                                errorMsg = "Http Error Code: 401. Unauthorized";
                                break;
                        }
                        case 404: {
                                model.addAttribute("errorCode", HttpStatus.NOT_FOUND.value());
                                errorMsg = "Http Error Code: 404. Resource not found";
                                break;
                        }
                        case 500: {
                                model.addAttribute("errorCode", HttpStatus.INTERNAL_SERVER_ERROR.value());
                                errorMsg = "Http Error Code: 500. Internal Server Error";
                                break;
                        }
                }
                model.addAttribute("errorMsg", errorMsg);
                return "error/errorPage";
        }

        @Override
        public String getErrorPath() {
                return "/error";
        }

        private int getErrorCode(HttpServletRequest httpRequest) {
                return (Integer) httpRequest
                        .getAttribute(RequestDispatcher.ERROR_STATUS_CODE);
        }
}