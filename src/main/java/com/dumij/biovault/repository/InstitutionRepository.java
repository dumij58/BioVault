package com.dumij.biovault.repository;

import com.dumij.biovault.model.Institution;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface InstitutionRepository extends MongoRepository<Institution, String> {

}