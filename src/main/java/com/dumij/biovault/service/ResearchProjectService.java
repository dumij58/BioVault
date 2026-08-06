package com.dumij.biovault.service;

import com.dumij.biovault.model.ResearchProject;
import com.dumij.biovault.repository.ResearchProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResearchProjectService {

    private final ResearchProjectRepository researchProjectRepository;

    public ResearchProjectService(ResearchProjectRepository researchProjectRepository) {
        this.researchProjectRepository = researchProjectRepository;
    }

    public ResearchProject saveProject(ResearchProject project) {
        return researchProjectRepository.save(project);
    }

    public List<ResearchProject> listAll() {
        return researchProjectRepository.findAll();
    }

    public ResearchProject getProjectById(String id) {
        return researchProjectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));
    }

    public ResearchProject updateProject(String id, ResearchProject project) {
        ResearchProject existingProject = researchProjectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));

        existingProject.setTitle(project.getTitle());
        existingProject.setDescription(project.getDescription());
        existingProject.setStartDate(project.getStartDate());
        existingProject.setEndDate(project.getEndDate());
        existingProject.setStatus(project.getStatus());
        existingProject.setPrincipalResearcherId(project.getPrincipalResearcherId());

        return researchProjectRepository.save(existingProject);
    }

    public void deleteProject(String id) {
        researchProjectRepository.deleteById(id);
    }
}
