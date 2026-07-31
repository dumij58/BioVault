package com.dumij.biovault.repository;

import com.dumij.biovault.model.Sample;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SampleRepository extends MongoRepository<Sample, String> {

    // Search samples by species (case-insensitive)
    List<Sample> findBySpeciesContainingIgnoreCase(String species);

    // Filter samples by project ID
    List<Sample> findByProjectId(String projectId);
}