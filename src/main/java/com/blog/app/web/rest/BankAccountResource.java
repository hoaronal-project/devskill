package com.blog.app.web.rest;

import com.blog.app.domain.BankAccount;
import com.blog.app.service.dto.BankAccountDTO;
import com.blog.app.web.rest.errors.BadRequestAlertException;
import com.blog.app.repository.BankAccountRepository;
import com.blog.app.service.mapper.BankAccountMapper;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@Transactional
public class BankAccountResource {

    private final Logger log = LoggerFactory.getLogger(BankAccountResource.class);

    private static final String ENTITY_NAME = "bankAccount";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BankAccountRepository bankAccountRepository;

    private final BankAccountMapper bankAccountMapper;

    public BankAccountResource(BankAccountRepository bankAccountRepository, BankAccountMapper bankAccountMapper) {
        this.bankAccountRepository = bankAccountRepository;
        this.bankAccountMapper = bankAccountMapper;
    }

    @PostMapping("/bank-accounts")
    public ResponseEntity<BankAccountDTO> createBankAccount(@Valid @RequestBody BankAccountDTO bankAccountDTO) throws URISyntaxException {
        log.debug("REST request to save BankAccount : {}", bankAccountDTO);
        if (bankAccountDTO.getId() != null) {
            throw new BadRequestAlertException("A new bankAccount cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BankAccount bankAccount = bankAccountMapper.toEntity(bankAccountDTO);
        bankAccount = bankAccountRepository.save(bankAccount);
        BankAccountDTO result = bankAccountMapper.toDto(bankAccount);
        return ResponseEntity.created(new URI("/api/bank-accounts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    @PutMapping("/bank-accounts")
    public ResponseEntity<BankAccountDTO> updateBankAccount(@Valid @RequestBody BankAccountDTO bankAccountDTO) throws URISyntaxException {
        log.debug("REST request to update BankAccount : {}", bankAccountDTO);
        if (bankAccountDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        BankAccount bankAccount = bankAccountMapper.toEntity(bankAccountDTO);
        bankAccount = bankAccountRepository.save(bankAccount);
        BankAccountDTO result = bankAccountMapper.toDto(bankAccount);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, bankAccountDTO.getId().toString()))
            .body(result);
    }

    @GetMapping("/bank-accounts")
    public List<BankAccountDTO> getAllBankAccounts() {
        log.debug("REST request to get all BankAccounts");
        List<BankAccount> bankAccounts = bankAccountRepository.findAll();
        return bankAccountMapper.toDto(bankAccounts);
    }

    @GetMapping("/bank-accounts/{id}")
    public ResponseEntity<BankAccountDTO> getBankAccount(@PathVariable Long id) {
        log.debug("REST request to get BankAccount : {}", id);
        Optional<BankAccountDTO> bankAccountDTO = bankAccountRepository.findById(id)
            .map(bankAccountMapper::toDto);
        return ResponseUtil.wrapOrNotFound(bankAccountDTO);
    }

    @DeleteMapping("/bank-accounts/{id}")
    public ResponseEntity<Void> deleteBankAccount(@PathVariable Long id) {
        log.debug("REST request to delete BankAccount : {}", id);
        bankAccountRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
