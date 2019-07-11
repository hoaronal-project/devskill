package com.blog.app.service.mapper;


import com.blog.app.domain.Label;
import com.blog.app.service.dto.LabelDTO;
import io.github.jhipster.sample.domain.*;

import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {})
public interface LabelMapper extends EntityMapper<LabelDTO, Label> {


    @Mapping(target = "operations", ignore = true)
    Label toEntity(LabelDTO labelDTO);

    default Label fromId(Long id) {
        if (id == null) {
            return null;
        }
        Label label = new Label();
        label.setId(id);
        return label;
    }
}
