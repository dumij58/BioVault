package com.dumij.biovault.repository;

import com.dumij.biovault.model.SequenceType;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface SequenceTypeRepository extends MongoRepository<SequenceType, String> {
    Optional<SequenceType> findByName(String name);
    Optional<SequenceType> findByNameIgnoreCase(String name);
}
