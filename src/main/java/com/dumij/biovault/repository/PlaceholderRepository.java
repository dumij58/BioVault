package com.dumij.biovault.repository;

import com.dumij.biovault.model.Placeholder;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PlaceholderRepository extends MongoRepository<Placeholder, String> {
}
