package com.devskill.web.support;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

import com.devskill.model.web.Menu;

@Slf4j
@Component
public class MenuLoader {

    @Value("classpath:menu/menu.json")
    private Resource resource;

    @SuppressWarnings({"unchecked", "rawtypes"})
    public List<Menu> loadMenu() throws Exception {
        try {
            InputStream is = resource.getInputStream();
            ObjectMapper mapper = new ObjectMapper();
            Map<String, Object> data = mapper.readValue(is, Map.class);

            List<Menu> menus = new ArrayList<Menu>();
            List objects = (List) data.get("menus");
            for (Object object : objects) {
                Menu m = getMenu(object);
                menus.add(m);
            }
            return menus;
        } catch (IOException e) {
            log.error("Error while loading menu " + e.getMessage());
            throw e;
        }
    }

    private Menu getMenu(Object object) {
        Map o = (Map) object;
        Map menu = (Map) o.get("menu");

        Menu m = new Menu();
        m.setCode((String) menu.get("code"));
        m.setUrl((String) menu.get("url"));
        m.setIcon((String) menu.get("icon"));
        m.setRole((String) menu.get("role"));

        List menus = (List) menu.get("menus");
        if (menus != null) {
            for (Object oo : menus) {
                Menu mm = getMenu(oo);
                m.getMenus().add(mm);
            }
        }
        return m;
    }
}
