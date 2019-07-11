package com.blog.app.web.rest;

import com.blog.app.domain.Operation;
import com.blog.app.service.dto.OperationDTO;
import com.blog.app.web.rest.errors.BadRequestAlertException;
import com.blog.app.repository.OperationRepository;
import com.blog.app.service.mapper.OperationMapper;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
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
public class OperationResource {

    private final Logger log = LoggerFactory.getLogger(OperationResource.class);

    private static final String ENTITY_NAME = "operation";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OperationRepository operationRepository;

    private final OperationMapper operationMapper;

    public OperationResource(OperationRepository operationRepository, OperationMapper operationMapper) {
        this.operationRepository = operationRepository;
        this.operationMapper = operationMapper;
    }

    @PostMapping("/operations")
    public ResponseEntity<OperationDTO> createOperation(@Valid @RequestBody OperationDTO operationDTO) throws URISyntaxException {
        log.debug("REST request to save Operation : {}", operationDTO);
        if (operationDTO.getId() != null) {
            throw new BadRequestAlertException("A new operation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Operation operation = operationMapper.toEntity(operationDTO);
        operation = operationRepository.save(operation);
        OperationDTO result = operationMapper.toDto(operation);
        return ResponseEntity.created(new URI("/api/operations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    @PutMapping("/operations")
    public ResponseEntity<OperationDTO> updateOperation(@Valid @RequestBody OperationDTO operationDTO) throws URISyntaxException {
        log.debug("REST request to update Operation : {}", operationDTO);
        if (operationDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Operation operation = operationMapper.toEntity(operationDTO);
        operation = operationRepository.save(operation);
        OperationDTO result = operationMapper.toDto(operation);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, operationDTO.getId().toString()))
            .body(result);
    }

    @GetMapping("/operations")
    public ResponseEntity<List<OperationDTO>> getAllOperations(Pageable pageable, @RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get a page of Operations");
        Page<OperationDTO> page;
        if (eagerload) {
            page = operationRepository.findAllWithEagerRelationships(pageable).map(operationMapper::toDto);
        } else {
            page = operationRepository.findAll(pageable).map(operationMapper::toDto);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping("/operations/{id}")
    public ResponseEntity<OperationDTO> getOperation(@PathVariable Long id) {
        log.debug("REST request to get Operation : {}", id);
        Optional<OperationDTO> operationDTO = operationRepository.findOneWithEagerRelationships(id)
            .map(operationMapper::toDto);
        return ResponseUtil.wrapOrNotFound(operationDTO);
    }

    @DeleteMapping("/operations/{id}")
    public ResponseEntity<Void> deleteOperation(@PathVariable Long id) {
        log.debug("REST request to delete Operation : {}", id);
        operationRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
