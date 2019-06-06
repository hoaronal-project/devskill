package com.devskill.web;

import java.util.List;

import com.google.common.cache.Cache;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.beanutils.BeanToPropertyValueTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.security.core.context.SecurityContextHolder;

import com.devskill.domain.Tag;
import com.devskill.web.support.AuthorizedUser;
import com.devskill.common.utils.ResponseUtils;

public abstract class AbstractController {

    @Autowired
    protected ResponseUtils responseUtil;

    @Autowired
    protected Cache<Object, Object> systemCache;

    @ModelAttribute
    public void addAttributes(Model model) {
        List<Tag> tagList = (List<Tag>) systemCache.getIfPresent("tagList");
        List<String> tags = (List<String>) CollectionUtils.collect(tagList, new BeanToPropertyValueTransformer("name"));
        model.addAttribute("tags", tags);
    }

    public AuthorizedUser getAuthorizedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        AuthorizedUser authorizedUser = null;
        if (authentication != null && authentication.getPrincipal() instanceof AuthorizedUser) {
            authorizedUser = (AuthorizedUser) authentication.getPrincipal();
        }
        return authorizedUser;
    }
}
