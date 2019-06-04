package com.devskill.model.web;

import lombok.Data;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Data
public class Menu implements Serializable {
    private String code;
    private String url;
    private String icon;
    private String role;
    private int order;
    private List<Menu> menus = new ArrayList<Menu>();
}
