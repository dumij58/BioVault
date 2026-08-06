package com.dumij.biovault.repository;

import com.dumij.biovault.model.Sample;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface SampleRepository extends MongoRepository<Sample, String> {
    List<Sample> findByProjectId(String projectId);
    List<Sample> findBySpeciesContainingIgnoreCase(String species);
}