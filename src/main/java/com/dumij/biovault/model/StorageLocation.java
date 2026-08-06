package com.dumij.biovault.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "storage_locations")
public class StorageLocation {

    @Id
    private String id;

    private String storageId;
    private String building;
    private String laboratory;
    private String freezerNumber;
    private String shelf;
    private String box;


    public StorageLocation() {
    }


    public StorageLocation(String storageId, String building, String laboratory,
                           String freezerNumber, String shelf, String box) {

        this.storageId = storageId;
        this.building = building;
        this.laboratory = laboratory;
        this.freezerNumber = freezerNumber;
        this.shelf = shelf;
        this.box = box;
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }


    public String getStorageId() {
        return storageId;
    }

    public void setStorageId(String storageId) {
        this.storageId = storageId;
    }


    public String getBuilding() {
        return building;
    }

    public void setBuilding(String building) {
        this.building = building;
    }


    public String getLaboratory() {
        return laboratory;
    }

    public void setLaboratory(String laboratory) {
        this.laboratory = laboratory;
    }


    public String getFreezerNumber() {
        return freezerNumber;
    }

    public void setFreezerNumber(String freezerNumber) {
        this.freezerNumber = freezerNumber;
    }


    public String getShelf() {
        return shelf;
    }

    public void setShelf(String shelf) {
        this.shelf = shelf;
    }


    public String getBox() {
        return box;
    }

    public void setBox(String box) {
        this.box = box;
    }
}