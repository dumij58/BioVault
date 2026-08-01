package com.dumij.biovault.controller;

import com.dumij.biovault.model.Institution;
import com.dumij.biovault.service.InstitutionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/institutions")
@CrossOrigin(origins = "*")
public class InstitutionController {

    @Autowired
    private InstitutionService service;

    @PostMapping
    public Institution createInstitution(@RequestBody Institution institution) {
        return service.createInstitution(institution);
    }

    @GetMapping
    public List<Institution> getAllInstitutions() {
        return service.getAllInstitutions();
    }

    @GetMapping("/{id}")
    public Institution getInstitutionById(@PathVariable String id) {
        return service.getInstitutionById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Institution updateInstitution(@PathVariable String id, @RequestBody Institution institution) {
        return service.updateInstitution(id, institution);
    }

    @DeleteMapping("/{id}")
    public String deleteInstitution(@PathVariable String id) {
        service.deleteInstitution(id);
        return "Institution deleted successfully with id: " + id;
    }
}