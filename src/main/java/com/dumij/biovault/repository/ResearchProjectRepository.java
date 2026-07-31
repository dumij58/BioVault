package com.dumij.biovault.repository;

import com.dumij.biovault.model.ResearchProject;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ResearchProjectRepository extends MongoRepository<ResearchProject, String> {

}
