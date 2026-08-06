package com.dumij.biovault.repository;

import com.dumij.biovault.model.ResearchProject;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ResearchProjectRepository extends MongoRepository<ResearchProject, String> {

}