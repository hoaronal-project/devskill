package com.devskill.web.guest;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("profile")
public class ProfileController {

    @GetMapping
    public String dashboard(@RequestParam(defaultValue = "") String keyword) {
        return "guest/profile/index";
    }

    @PostMapping({"/note"})
    public String register(@RequestParam String email, BindingResult result) {

        if(StringUtils.isBlank(email)){
        }
        return "guest/profile/note";
    }
}
