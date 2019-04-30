package com.techblog.interceptor;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class SessionAdminInterceptor extends HandlerInterceptorAdapter {

    private final Logger logger = LoggerFactory.getLogger(SessionAdminInterceptor.class);

    /*@Autowired
    private SessionServiceImpl sessionService;*/

    @Override
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response, Object handler) throws Exception {

        String url = request.getRequestURI();
        logger.info("Admin Interceptor:",url);
        /*LoginSession loginSession = sessionService.getLoginSession(request);
        if(loginSession==null) {
            sessionService.removeLoginCookies(request, response);
            response.sendRedirect(request.getContextPath()+"/login.html");

            return false;
        } else {
            boolean isAdmin = loginSession.getAdmin();
            if(!isAdmin) {
                response.sendRedirect(request.getContextPath()+"/user/home.html");
                return false;
            }
        }*/

        return super.preHandle(request, response, handler);


    }
}