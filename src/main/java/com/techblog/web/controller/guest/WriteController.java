package com.techblog.web.controller.guest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("viet-bai")
public class WriteController {

    @GetMapping({"{loginId}"})
    public String dashboard(@PathVariable String loginId,
                            Model model,
                            HttpServletRequest servletRequest) {

        return "guest/write";
    }
}
