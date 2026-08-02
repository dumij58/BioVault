package com.dumij.biovault.controller;

import com.dumij.biovault.dto.ResearcherRequest;
import com.dumij.biovault.dto.ResearcherResponse;
import com.dumij.biovault.mapper.ResearcherMapper;
import com.dumij.biovault.model.Researcher;
import com.dumij.biovault.service.ResearcherService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import jakarta.validation.Valid;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/researchers")
public class ResearcherController {

    private final ResearcherService researcherService;

    public ResearcherController(ResearcherService researcherService) {
        this.researcherService = researcherService;
    }

    @PostMapping
    public ResponseEntity<ResearcherResponse> createResearcher(
            @Valid @RequestBody ResearcherRequest request) {

        Researcher researcher =
                ResearcherMapper.toEntity(request);

        Researcher savedResearcher =
                researcherService.createResearcher(researcher);

        ResearcherResponse response =
                ResearcherMapper.toResponse(savedResearcher);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping
    public ResponseEntity<List<ResearcherResponse>> getAllResearchers() {

        List<Researcher> researchers =
                researcherService.getAllResearchers();

        return ResponseEntity.ok(
                ResearcherMapper.toResponseList(researchers)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResearcherResponse> getResearcherById(
            @PathVariable String id) {

        Optional<Researcher> researcher =
                researcherService.getResearcherById(id);

        if (researcher.isPresent()) {
            return ResponseEntity.ok(
                    ResearcherMapper.toResponse(researcher.get())
            );
        }

        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResearcherResponse> updateResearcher(
            @PathVariable String id,
            @Valid @RequestBody ResearcherRequest request) {

        Researcher researcher =
                ResearcherMapper.toEntity(request);

        Researcher updatedResearcher =
                researcherService.updateResearcher(id, researcher);

        if (updatedResearcher == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(
                ResearcherMapper.toResponse(updatedResearcher)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteResearcher(
            @PathVariable String id) {

        researcherService.deleteResearcher(id);

        return ResponseEntity.noContent().build();
    }
}