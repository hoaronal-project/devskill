package com.devskill.web.guest;

import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.beans.factory.annotation.Autowired;

import com.devskill.domain.Post;
import com.devskill.web.AbstractController;
import com.devskill.web.support.Pagination;
import com.devskill.model.PostSearchRequest;
import com.devskill.service.post.PostService;
import com.devskill.service.user.UserService;

@Controller
public class HomeController extends AbstractController {

    private final UserService userService;

    private final PostService postService;

    @Autowired
    public HomeController(UserService userService, PostService postService) {
        this.userService = userService;
        this.postService = postService;
    }

    @GetMapping({"/"})
    public String dashboard(@RequestParam(defaultValue = "") String keyword,
                            @PageableDefault(50) Pageable pageable,
                            Model model,
                            HttpServletRequest servletRequest) {
        PostSearchRequest request = new PostSearchRequest("vi").withKeyword(keyword);
        Page<Post> posts = postService.getPosts(request, pageable);
        model.addAttribute("keyword", keyword);
        model.addAttribute("listItem", posts.getContent());
        model.addAttribute("listMostItem", posts.getContent());
        model.addAttribute("pageable", pageable);
        model.addAttribute("pagination", new Pagination<>(posts, servletRequest));
        return "guest/index";
    }

    @GetMapping({"/test"})
    public String get(){
        return "guest/cv/cv-doan-quang-hoa";
    }

    @GetMapping("post/{code}")
    public String newPost(@PathVariable("code") String code, Model model, HttpServletRequest request){
        try {
            Post post = postService.getPostByCode(code);
            model.addAttribute("item",post);
        }catch (Exception e){
            e.printStackTrace();
        }
        return "guest/post/detail";
    }
}
