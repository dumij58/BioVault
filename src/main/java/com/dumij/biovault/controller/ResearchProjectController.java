package com.dumij.biovault.controller;

import com.dumij.biovault.model.ResearchProject;
import com.dumij.biovault.service.ResearchProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

//This receives HTTP requests
@RestController
@RequestMapping("api/v1/research_projects")
@CrossOrigin(origins = "*")
public class ResearchProjectController {
    private final ResearchProjectService researchProjectService;

    public ResearchProjectController(ResearchProjectService researchProjectService) {
        this.researchProjectService = researchProjectService;
    }
    @PostMapping("/save")
    public ResearchProject addProject(@RequestBody ResearchProject project) {
        return researchProjectService.saveProject(project);
    }

    @GetMapping("/getall")
    public List<ResearchProject> getProjects() {
        return researchProjectService.listAll();
    }

    @GetMapping("/{id}")
    public ResearchProject getProject(@PathVariable("id") String id) {
        return researchProjectService.getProjectById(id);
    }
    @DeleteMapping("/delete/{id}")
    public void deleteProject(@PathVariable("id") String id) {
        researchProjectService.deleteProject(id);
    }
    @PutMapping("/update/{id}")
    public ResearchProject updateProject(@PathVariable("id") String id, @RequestBody ResearchProject project) {
        return researchProjectService.updateProject(id, project);
    }

}