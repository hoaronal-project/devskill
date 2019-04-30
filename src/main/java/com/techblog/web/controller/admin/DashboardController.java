package com.techblog.web.controller.admin;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("admin_")
public class DashboardController {

    @GetMapping
    public String dashboard(Model model){
        return "admin/index";
    }

    @PostMapping("dologin")
    public String dologin(Model model, @RequestParam String email, @RequestParam String password){

        System.out.println(email);
        System.out.println(password);
        return "admin/login";
    }
}
