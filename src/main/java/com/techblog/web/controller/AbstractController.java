package com.techblog.web.controller;

import com.techblog.common.constant.Constants;
import com.techblog.common.utils.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;

public abstract class AbstractController {

    @Autowired
    protected ResponseUtil responseUtil;

    @ModelAttribute
    public void addAttributes(Model model) {
        model.addAttribute("tags", Constants.TAGS);
    }

}
