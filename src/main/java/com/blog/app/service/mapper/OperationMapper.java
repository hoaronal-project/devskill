package com.blog.app.service.mapper;


import com.blog.app.domain.Operation;
import com.blog.app.service.dto.OperationDTO;
import io.github.jhipster.sample.domain.*;

import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {BankAccountMapper.class, LabelMapper.class})
public interface OperationMapper extends EntityMapper<OperationDTO, Operation> {

    @Mapping(source = "bankAccount.id", target = "bankAccountId")
    @Mapping(source = "bankAccount.name", target = "bankAccountName")
    OperationDTO toDto(Operation operation);

    @Mapping(source = "bankAccountId", target = "bankAccount")
    Operation toEntity(OperationDTO operationDTO);

    default Operation fromId(Long id) {
        if (id == null) {
            return null;
        }
        Operation operation = new Operation();
        operation.setId(id);
        return operation;
    }
}
