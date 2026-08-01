package com.dumij.biovault.controller;

import com.dumij.biovault.model.Sample;
import com.dumij.biovault.service.SampleService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/samples")
public class SampleController {

    private final SampleService sampleService;

    @Autowired
    public SampleController(SampleService sampleService) {
        this.sampleService = sampleService;
    }

    @GetMapping
    public ResponseEntity<List<Sample>> getAllSamples() {
        return ResponseEntity.ok(sampleService.getAllSamples());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Sample> getSampleById(@PathVariable String id) {
        return sampleService.getSampleById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Sample> createSample(@Valid @RequestBody Sample sample) {
        Sample created = sampleService.createSample(sample);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Sample> updateSample(@PathVariable String id, @Valid @RequestBody Sample sample) {
        return ResponseEntity.ok(sampleService.updateSample(id, sample));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSample(@PathVariable String id) {
        sampleService.deleteSample(id);
        return ResponseEntity.noContent().build();
    }
}