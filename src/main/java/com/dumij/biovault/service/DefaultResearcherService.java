package com.dumij.biovault.service;

import com.dumij.biovault.exception.DuplicateEmailException;
import com.dumij.biovault.exception.ResearcherNotFoundException;
import com.dumij.biovault.model.Researcher;
import com.dumij.biovault.repository.ResearcherRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class DefaultResearcherService implements ResearcherService {
    private final ResearcherRepository researcherRepository;

    public DefaultResearcherService(ResearcherRepository researcherRepository) {
        this.researcherRepository = researcherRepository;
    }

    @Override
    public Researcher createResearcher(Researcher researcher) {

        if (researcherRepository.findByEmail(researcher.getEmail()).isPresent()) {
            throw new DuplicateEmailException("A researcher with this email already exists.");
        }

        return researcherRepository.save(researcher);
    }

    @Override
    public List<Researcher> getAllResearchers() {
        return researcherRepository.findAll();
    }

    @Override
    public Optional<Researcher> getResearcherById(String id) {
        return researcherRepository.findById(id);
    }

    @Override
    public void deleteResearcher(String id) {

        Researcher researcher = researcherRepository
                .findById(id)
                .orElseThrow(() ->
                        new ResearcherNotFoundException("Researcher not found.")
                );

        researcherRepository.delete(researcher);
    }

    @Override
    public Researcher updateResearcher(String id, Researcher researcher) {

        Researcher existingResearcher = researcherRepository
                .findById(id)
                .orElseThrow(() ->
                        new ResearcherNotFoundException(
                                "Researcher not found."
                        ));

        existingResearcher.setName(researcher.getName());
        existingResearcher.setEmail(researcher.getEmail());
        existingResearcher.setDepartment(researcher.getDepartment());
        existingResearcher.setDesignation(researcher.getDesignation());

        return researcherRepository.save(existingResearcher);
    }



}
