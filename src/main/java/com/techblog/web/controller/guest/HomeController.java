package com.techblog.web.controller.guest;

import com.techblog.domain.Post;
import com.techblog.model.PostSearchRequest;
import com.techblog.service.post.PostService;
import com.techblog.service.user.UserService;
import com.techblog.web.controller.AbstractController;
import com.techblog.web.support.Pagination;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;

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
        /*Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        AuthorizedUser authorizedUser = null;
        if (authentication != null && authentication.getPrincipal() instanceof AuthorizedUser) {
            authorizedUser = (AuthorizedUser) authentication.getPrincipal();
        }
        Object o = authentication.getPrincipal();
        System.out.println(authentication.getPrincipal());*/
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

    @GetMapping(value = "login", params = {"failed"})
    public String loginFailed(){
        return "guest/index";
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

    @GetMapping("/lien-he")
    public String contact(Model model){
        return "guest/contact";
    }

    @GetMapping("/gioi-thieu")
    public String about(Model model){
        return "guest/about";
    }

    @GetMapping("chat-box")
    public String chatbox(Model model){
        return "index";
    }

    @GetMapping("chat")
    public String chat(Model model){
        return "chat";
    }
}
