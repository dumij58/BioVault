package com.dumij.biovault.repository;

import com.dumij.biovault.model.Researcher;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface ResearcherRepository extends MongoRepository<Researcher, String> {
    Optional<Researcher> findByEmail(String email);

}
