package com.dumij.biovault.controller;

import com.dumij.biovault.model.Sample;
import com.dumij.biovault.service.SampleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/samples")
@CrossOrigin(origins = "*")
public class SampleController {

    private final SampleService sampleService;

    SampleController(SampleService sampleService) {
        this.sampleService = sampleService;
    }

    @PostMapping
    public ResponseEntity<Sample> createSample(@RequestBody Sample sample) {
        Sample created = sampleService.createSample(sample);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Sample> getSampleById(@PathVariable String id) {
        return sampleService.getSampleById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public List<Sample> getAllSamples() {
        return sampleService.getAllSamples();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Sample> updateSample(@PathVariable String id, @RequestBody Sample sample) {
        Sample updated = sampleService.updateSample(id, sample);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSample(@PathVariable String id) {
        sampleService.deleteSample(id);
        return ResponseEntity.noContent().build();
    }
}