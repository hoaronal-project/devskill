package com.techblog.web.blog;

import com.techblog.web.AbstractBlogController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/blog")
public class BlogController extends AbstractBlogController {

    @GetMapping
    public String get() {
        return "guest/index";
    }
}
