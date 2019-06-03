package com.devskill.web.admin.post;

import com.devskill.domain.Post;
import com.devskill.domain.Tag;
import com.devskill.model.PostSearchRequest;
import com.devskill.service.post.PostService;
import com.devskill.service.tag.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("_admin")
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private TagService tagService;

    @GetMapping("posts")
    public String list(@RequestParam(defaultValue = "") String keyword,
                       @PageableDefault(50) Pageable pageable,
                       Model model){
        PostSearchRequest request = new PostSearchRequest("vi").withKeyword(keyword);
        Page<Post> posts = postService.getPosts(request, pageable);
        model.addAttribute("listItem", posts.getContent());
        return "admin/post/list";
    }

    @GetMapping("post-create")
    public String newPost(Model model){
        List<Tag> tags = tagService.findAll();
        model.addAttribute("tags",tags);
        return "admin/post/create";
    }

}
