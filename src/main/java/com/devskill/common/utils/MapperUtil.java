package com.devskill.common.utils;

import org.modelmapper.ModelMapper;

public class MapperUtil<O, R> {

    public R convert(O o, R r){
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.map(o, r);
        return r;
    }
}
