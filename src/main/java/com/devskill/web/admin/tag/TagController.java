package com.devskill.web.admin.tag;

import java.util.List;

import com.devskill.service.tag.TagService;
import com.devskill.domain.Tag;
import com.devskill.web.AbstractController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("_admin")
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
