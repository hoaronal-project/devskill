package com.devskill.interceptor;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class PostInterceptor implements HandlerInterceptor {
    // Called before handler method invocation
    @Override
    public boolean preHandle(HttpServletRequest req, HttpServletResponse res,
                             Object handler) throws Exception {
        System.out.println("Called before handler method");
        req.setAttribute("fname", "Elizabeth");
        return true;
    }

    // Called after handler method request completion, before rendering the view
    @Override
    public void postHandle(HttpServletRequest req, HttpServletResponse res,
                           Object handler, ModelAndView model)  throws Exception {
        System.out.println("Called after handler method request completion,"
                + " before rendering the view");

        model.addObject("lname", "Brown");
    }

    // Called after rendering the view
    @Override
    public void afterCompletion(HttpServletRequest req, HttpServletResponse res,
                                Object handler, Exception ex)  throws Exception {
        System.out.println("Called after rendering the view");
    }
}
