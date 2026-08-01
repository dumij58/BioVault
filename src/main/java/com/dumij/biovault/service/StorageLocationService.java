package com.dumij.biovault.service;

import com.dumij.biovault.model.StorageLocation;
import com.dumij.biovault.repository.StorageLocationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StorageLocationService {

    private final StorageLocationRepository repository;

    public StorageLocationService(StorageLocationRepository repository) {
        this.repository = repository;
    }

    // Add a storage location
    public StorageLocation saveLocation(StorageLocation location) {
        return repository.save(location);
    }

    // Get all storage locations
    public List<StorageLocation> getAllLocations() {
        return repository.findAll();
    }

    // Get one location by ID
    public StorageLocation getLocationById(String id) {
        return repository.findById(id).orElse(null);
    }

    // Update a location
    public StorageLocation updateLocation(StorageLocation location) {
        return repository.save(location);
    }

    // Delete a location
    public void deleteLocation(String id) {
        repository.deleteById(id);
    }
}