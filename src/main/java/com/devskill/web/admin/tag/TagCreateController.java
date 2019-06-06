package com.devskill.web.admin.tag;

import java.util.Map;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.devskill.service.tag.TagService;
import com.devskill.web.AbstractController;
import com.devskill.web.support.Response;

@Controller
@RequestMapping("_admin")
public class TagCreateController extends AbstractController {

    @Autowired
    private TagService tagService;

    @PostMapping("tag")
    public @ResponseBody
    ResponseEntity<Response> create(@RequestBody @Valid TagCreateForm form,
                                    BindingResult bindingResult) {
        Map<String, String> errors = null;
        if (bindingResult.hasErrors()) {
            errors = bindingResult.getFieldErrors().stream()
              .collect(
                Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage)
              );
            return responseUtil.errorResponse(form, errors);
        }
        return responseUtil.successResponse(tagService.add(form.buildTagCreateRequest(), getAuthorizedUser()), errors);
    }
}
