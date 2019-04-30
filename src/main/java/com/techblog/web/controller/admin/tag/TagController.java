package com.techblog.web.controller.admin.tag;

import com.techblog.service.tag.TagService;
import com.techblog.domain.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("admin_")
public class TagController {

    @Autowired
    private TagService tagService;

    @GetMapping("tag/list")
    public String list(Model model){
        List<Tag> tags = tagService.findAll();
        model.addAttribute("listItem",tags);
        return "admin/tag/list";
    }

}
