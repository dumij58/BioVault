package com.dumij.biovault.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import java.time.LocalDate;

@Document(collection = "samples")
public class Sample {

    @Id
    private String id;

    private String species;

    @Field("sample_type")
    private String sampleType;

    @Field("collection_date")
    private LocalDate collectionDate;

    @Field("storage_location")
    private String storageLocation;

    @Field("project_id")
    private String projectId;

    @Field("storage_location_id")
    private String storageLocationId;

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getSpecies() { return species; }
    public void setSpecies(String species) { this.species = species; }

    public String getSampleType() { return sampleType; }
    public void setSampleType(String sampleType) { this.sampleType = sampleType; }

    public LocalDate getCollectionDate() { return collectionDate; }
    public void setCollectionDate(LocalDate collectionDate) { this.collectionDate = collectionDate; }

    public String getStorageLocation() { return storageLocation; }
    public void setStorageLocation(String storageLocation) { this.storageLocation = storageLocation; }

    public String getProjectId() { return projectId; }
    public void setProjectId(String projectId) { this.projectId = projectId; }

    public String getStorageLocationId() { return storageLocationId; }
    public void setStorageLocationId(String storageLocationId) { this.storageLocationId = storageLocationId; }
}