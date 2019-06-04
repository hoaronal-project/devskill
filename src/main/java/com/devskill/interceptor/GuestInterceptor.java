package com.devskill.interceptor;

import com.devskill.model.web.Menu;
import com.devskill.web.support.MenuLoader;
import com.google.common.cache.Cache;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class GuestInterceptor extends HandlerInterceptorAdapter {

    private final MenuLoader menuLoader;

    protected final Cache<Object, Object> systemCache;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        try {
            List<Menu> list = getMenu();
            request.setAttribute("MENU", list);
        } catch (Exception e) {
            log.error("Cannot retrieve menus" + e.getMessage());
        }
        return true;
    }

    private List<Menu> getMenu() throws Exception {
        List<Menu> listMenu = (List<Menu>) systemCache.getIfPresent("MENU");
        if (listMenu == null) {
            listMenu = menuLoader.loadMenu();
            systemCache.put("MENU", listMenu);
        }
        return listMenu;
    }
}
