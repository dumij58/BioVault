package com.dumij.biovault.repository;

import com.dumij.biovault.model.Sample;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SampleRepository extends MongoRepository<Sample, String> {
<<<<<<< HEAD

    // Search samples by species (case-insensitive)
    List<Sample> findBySpeciesContainingIgnoreCase(String species);

    // Filter samples by project ID
    List<Sample> findByProjectId(String projectId);
=======
>>>>>>> cabf796 (Fix backend compilation errors and migrate models to MongoDB)
}