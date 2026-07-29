package com.dumij.biovault.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "placeholder")
public class Placeholder {
    @Id
    private String id;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
}
