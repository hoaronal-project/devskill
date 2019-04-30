package com.techblog.web.controller.blog;

import com.techblog.common.constant.Constants;
import com.techblog.web.controller.AbstractController;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;

public abstract class AbstractBlogController extends AbstractController {

    @ModelAttribute
    public void addAttributes(Model model) {
        model.addAttribute("tags", Constants.TAGS);
    }

}
