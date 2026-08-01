package com.dumij.biovault.controller;

import com.dumij.biovault.model.StorageLocation;
import com.dumij.biovault.service.StorageLocationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/storage-locations")
@CrossOrigin(origins = "*")
public class StorageLocationController {

    private final StorageLocationService service;

    public StorageLocationController(StorageLocationService service) {
        this.service = service;
    }

    // Create a storage location
    @PostMapping
    public StorageLocation createLocation(@RequestBody StorageLocation location) {
        return service.saveLocation(location);
    }

    // Get all storage locations
    @GetMapping
    public List<StorageLocation> getAllLocations() {
        return service.getAllLocations();
    }

    // Get one storage location
    @GetMapping("/{id}")
    public StorageLocation getLocation(@PathVariable String id) {
        return service.getLocationById(id);
    }

    // Update a storage location
    @PutMapping("/{id}")
    public StorageLocation updateLocation(@PathVariable String id,
                                          @RequestBody StorageLocation location) {
        location.setId(id);
        return service.updateLocation(location);
    }

    // Delete a storage location
    @DeleteMapping("/{id}")
    public void deleteLocation(@PathVariable String id) {
        service.deleteLocation(id);
    }
}