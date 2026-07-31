package com.dumij.biovault.service;

import com.dumij.biovault.model.Sample;
import com.dumij.biovault.repository.SampleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SampleService {

    private final SampleRepository sampleRepository;

    @Autowired
    public SampleService(SampleRepository sampleRepository) {
        this.sampleRepository = sampleRepository;
    }

    // Get all samples
    public List<Sample> getAllSamples() {
        return sampleRepository.findAll();
    }

    // Get sample by ID
    public Optional<Sample> getSampleById(Long id) {
        return sampleRepository.findById(id);
    }

    // Save/Register new sample
    public Sample saveSample(Sample sample) {
        return sampleRepository.save(sample);
    }

    // Update existing sample
    public Sample updateSample(Long id, Sample updatedSample) {
        return sampleRepository.findById(id).map(sample -> {
            sample.setSpecies(updatedSample.getSpecies());
            sample.setSampleType(updatedSample.getSampleType());
            sample.setCollectionDate(updatedSample.getCollectionDate());
            sample.setProjectId(updatedSample.getProjectId());
            sample.setStorageLocationId(updatedSample.getStorageLocationId());
            return sampleRepository.save(sample);
        }).orElseThrow(() -> new RuntimeException("Sample not found with id " + id));
    }

    // Delete sample
    public void deleteSample(Long id) {
        sampleRepository.deleteById(id);
    }

    // Search by species
    public List<Sample> searchBySpecies(String species) {
        return sampleRepository.findBySpeciesContainingIgnoreCase(species);
    }

    // Filter by project ID
    public List<Sample> getSamplesByProject(Long projectId) {
        return sampleRepository.findByProjectId(projectId);
    }
}