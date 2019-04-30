package com.techblog.web.controller;

import com.techblog.common.utils.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;

public abstract class AbstractController {

    @Autowired
    protected ResponseUtil responseUtil;

}
