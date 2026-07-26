package com.dumij.biovault.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "institutions")
public class Institution {

    @Id
    private String id;

    private String name;
    private String country;
    private String address;
    private String contactInformation;

    public Institution() {
    }

    public Institution(String name, String country, String address, String contactInformation) {
        this.name = name;
        this.country = country;
        this.address = address;
        this.contactInformation = contactInformation;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getContactInformation() { return contactInformation; }
    public void setContactInformation(String contactInformation) { this.contactInformation = contactInformation; }
}