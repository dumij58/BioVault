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

    public List<Sample> getAllSamples() {
        return sampleRepository.findAll();
    }

    public Optional<Sample> getSampleById(String id) {
        return sampleRepository.findById(id);
    }

    public Sample createSample(Sample sample) {
        return sampleRepository.save(sample);
    }

    public Sample updateSample(String id, Sample updatedSample) {
        return sampleRepository.findById(id).map(sample -> {
            sample.setName(updatedSample.getName());
            sample.setSpecies(updatedSample.getSpecies());
            sample.setProjectId(updatedSample.getProjectId());
            sample.setCollectionDate(updatedSample.getCollectionDate());
            sample.setStorageLocationId(updatedSample.getStorageLocationId());
            return sampleRepository.save(sample);
        }).orElseThrow(() -> new RuntimeException("Sample not found with id: " + id));
    }

    public void deleteSample(String id) {
        sampleRepository.deleteById(id);
    }
}