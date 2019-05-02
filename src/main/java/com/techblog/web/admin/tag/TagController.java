package com.techblog.web.admin.tag;

import java.util.List;

import com.techblog.service.tag.TagService;
import com.techblog.domain.Tag;
import com.techblog.web.AbstractController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("admin_")
public class TagController extends AbstractController {

    @Autowired
    private TagService tagService;

    @GetMapping("tags")
    public String list(Model model){
        List<Tag> tags = tagService.findAll();
        model.addAttribute("listItem",tags);
        return "admin/tag/list";
    }

    @GetMapping("tag-create")
    public String createView(){
        return "admin/tag/create";
    }
}
