package com.dumij.biovault.controller;

import com.dumij.biovault.dto.SequenceTypeDTO;
import com.dumij.biovault.service.SequenceTypeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sequence-types")
@CrossOrigin(origins = "*")
public class SequenceTypeController {

    private final SequenceTypeService service;

    SequenceTypeController(SequenceTypeService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<SequenceTypeDTO>> getAll() {
        return ResponseEntity.ok(service.getAllTypes());
    }

    @PostMapping
    public ResponseEntity<SequenceTypeDTO> create(@RequestBody SequenceTypeDTO dto) {
        return new ResponseEntity<>(service.createType(dto), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SequenceTypeDTO> update(@PathVariable String id, @RequestBody SequenceTypeDTO dto) {
        return ResponseEntity.ok(service.updateType(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        service.deleteType(id);
        return ResponseEntity.noContent().build();
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgument(IllegalArgumentException ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
    }
}
