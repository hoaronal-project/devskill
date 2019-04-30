package com.techblog.web.controller;

import com.techblog.common.utils.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;

public abstract class AbstractBaseController {

    /*@Autowired
    private CustomUserAuthService userDetailsService;

    @Autowired
    AppConfig appConfig;*/

    @Autowired
    protected ResponseUtil responseUtil;

    /*public AuthUser getAuthUserFromSession(HttpServletRequest request) {
        String authToken = request.getHeader(Constant.HEADER_TOKEN);
        // try to load sessio
        AuthUser user = userDetailsService.loadUserByAccessToken(authToken);
        return user;
    }*/
}
