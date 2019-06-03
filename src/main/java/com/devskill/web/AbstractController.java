package com.devskill.web;

import com.devskill.common.constant.Constants;
import com.devskill.common.utils.ResponseUtil;
import com.devskill.web.support.AuthorizedUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;

public abstract class AbstractController {

    @Autowired
    protected ResponseUtil responseUtil;

    @ModelAttribute
    public void addAttributes(Model model) {

        model.addAttribute("tags", Constants.TAGS);
    }

    public AuthorizedUser getAuthorizedUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        AuthorizedUser authorizedUser = null;
        if (authentication != null && authentication.getPrincipal() instanceof AuthorizedUser) {
            authorizedUser = (AuthorizedUser) authentication.getPrincipal();
        }
        return authorizedUser;
    }
}
