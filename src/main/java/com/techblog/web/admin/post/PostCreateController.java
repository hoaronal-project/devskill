package com.techblog.web.admin.post;

import com.techblog.service.post.PostService;
import com.techblog.model.PostCreateForm;
import com.techblog.web.AbstractController;
import com.techblog.web.support.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.validation.Valid;
import java.io.IOException;
import java.util.Map;
import java.util.stream.Collectors;

@Controller
@RequestMapping("admin_")
public class PostCreateController extends AbstractController {

    @Autowired
    private PostService postService;

    @PutMapping("post")
    public ResponseEntity<Response> newPost(@RequestBody @Valid PostCreateForm form,
                                            BindingResult bindingResult, Model model) throws IOException {
        Map<String, String> errors = null;
        if(bindingResult.hasErrors()){
            errors = bindingResult.getFieldErrors().stream()
                    .collect(
                            Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage)
                    );
            return responseUtil.errorResponse(form, errors);
        }
        return responseUtil.successResponse(postService.add(form.convert(form)), errors);
    }

}
