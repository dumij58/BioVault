package com.dumij.biovault.service;

import com.dumij.biovault.model.Institution;
import com.dumij.biovault.repository.InstitutionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InstitutionService {

    @Autowired
    private InstitutionRepository repository;

    public Institution createInstitution(Institution institution) {
        return repository.save(institution);
    }

    public List<Institution> getAllInstitutions() {
        return repository.findAll();
    }

    public Optional<Institution> getInstitutionById(String id) {
        return repository.findById(id);
    }

    public Institution updateInstitution(String id, Institution updatedDetails) {
        return repository.findById(id).map(institution -> {
            institution.setName(updatedDetails.getName());
            institution.setCountry(updatedDetails.getCountry());
            institution.setAddress(updatedDetails.getAddress());
            institution.setContactInformation(updatedDetails.getContactInformation());
            return repository.save(institution);
        }).orElseThrow(() -> new RuntimeException("Institution not found with id " + id));
    }

    public void deleteInstitution(String id) {
        repository.deleteById(id);
    }
}