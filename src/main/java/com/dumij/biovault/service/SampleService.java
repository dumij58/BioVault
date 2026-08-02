package com.dumij.biovault.service;

import com.dumij.biovault.model.Sample;
import com.dumij.biovault.repository.SampleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class SampleService {

    @Autowired
    private SampleRepository sampleRepository;

    public Sample createSample(Sample sample) {
        // Let MongoDB generate the ID automatically
        return sampleRepository.save(sample);
    }

    public Optional<Sample> getSampleById(String id) {
        return sampleRepository.findById(id);
    }

    public List<Sample> getAllSamples() {
        return sampleRepository.findAll();
    }

    public Sample updateSample(String id, Sample sampleDetails) {
        Sample existing = sampleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sample not found with id: " + id));

        existing.setSpecies(sampleDetails.getSpecies());
        existing.setSampleType(sampleDetails.getSampleType());
        existing.setCollectionDate(sampleDetails.getCollectionDate());
        existing.setStorageLocation(sampleDetails.getStorageLocation());
        existing.setProjectId(sampleDetails.getProjectId());
        existing.setStorageLocationId(sampleDetails.getStorageLocationId());

        return sampleRepository.save(existing);
    }

    public void deleteSample(String id) {
        sampleRepository.deleteById(id);
    }
}