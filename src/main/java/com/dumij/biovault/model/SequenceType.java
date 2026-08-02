package com.dumij.biovault.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "sequence_types")
public class SequenceType {
    @Id
    private String id;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
}
