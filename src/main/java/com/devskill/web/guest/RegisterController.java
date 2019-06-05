package com.devskill.web.guest;

import com.devskill.model.UserCreateForm;
import com.devskill.service.user.UserService;
import com.devskill.web.support.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.devskill.web.AbstractController;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;
import java.util.stream.Collectors;

@Controller
@RequiredArgsConstructor
public class RegisterController extends AbstractController {

    private final UserService userService;

    @PostMapping({"/register"})
    @ResponseBody
    public ResponseEntity<Response> register(@RequestBody UserCreateForm userCreateForm, BindingResult bindingResult) {
        Map<String, String> errors = null;
        if (bindingResult.hasErrors()) {
            errors = bindingResult.getFieldErrors().stream()
              .collect(
                Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage)
              );
            return responseUtil.errorResponse(userCreateForm, errors);
        }
        return responseUtil.successResponse(userService.register(userCreateForm), errors);
    }
}
