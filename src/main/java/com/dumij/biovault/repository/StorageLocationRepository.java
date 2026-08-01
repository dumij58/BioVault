package com.dumij.biovault.repository;

import com.dumij.biovault.model.StorageLocation;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface StorageLocationRepository extends MongoRepository<StorageLocation, String> {

}
