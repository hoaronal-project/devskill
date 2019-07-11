package com.blog.app.service.mapper;


import com.blog.app.domain.BankAccount;
import com.blog.app.service.dto.BankAccountDTO;
import io.github.jhipster.sample.domain.*;

import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface BankAccountMapper extends EntityMapper<BankAccountDTO, BankAccount> {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.login", target = "userLogin")
    BankAccountDTO toDto(BankAccount bankAccount);

    @Mapping(source = "userId", target = "user")
    @Mapping(target = "operations", ignore = true)
    BankAccount toEntity(BankAccountDTO bankAccountDTO);

    default BankAccount fromId(Long id) {
        if (id == null) {
            return null;
        }
        BankAccount bankAccount = new BankAccount();
        bankAccount.setId(id);
        return bankAccount;
    }
}
