package com.dumij.biovault.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

@Entity
@Table(name = "samples")
public class Sample {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Species is required")
    @Column(nullable = false)
    private String species;

    @NotBlank(message = "Sample type is required")
    @Column(name = "sample_type", nullable = false)
    private String sampleType;

    @NotNull(message = "Collection date is required")
    @Column(name = "collection_date", nullable = false)
    private LocalDate collectionDate;

    @NotNull(message = "Project ID is required")
    @Column(name = "project_id", nullable = false)
    private Long projectId;

    @NotNull(message = "Storage location ID is required")
    @Column(name = "storage_location_id", nullable = false)
    private Long storageLocationId;

    // Default Constructor
    public Sample() {
    }

    // Parameterized Constructor
    public Sample(String species, String sampleType, LocalDate collectionDate, Long projectId, Long storageLocationId) {
        this.species = species;
        this.sampleType = sampleType;
        this.collectionDate = collectionDate;
        this.projectId = projectId;
        this.storageLocationId = storageLocationId;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSpecies() {
        return species;
    }

    public void setSpecies(String species) {
        this.species = species;
    }

    public String getSampleType() {
        return sampleType;
    }

    public void setSampleType(String sampleType) {
        this.sampleType = sampleType;
    }

    public LocalDate getCollectionDate() {
        return collectionDate;
    }

    public void setCollectionDate(LocalDate collectionDate) {
        this.collectionDate = collectionDate;
    }

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public Long getStorageLocationId() {
        return storageLocationId;
    }

    public void setStorageLocationId(Long storageLocationId) {
        this.storageLocationId = storageLocationId;
    }
}