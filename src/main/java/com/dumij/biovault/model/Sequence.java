package com.dumij.biovault.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "sequences")
public class Sequence {
    @Id
    private String id;
    private String name;
    private String sequence;
    private Long seqLength;

    @DBRef
    private SequenceType seqType;
    @DBRef
    private Sample sample;

    // Setters
    public void setId(String id) {
        this.id = id;
    }
    public void setName(String name) {
        this.name = name;
    }
    public void setSequence(String sequence) {
        this.sequence = sequence;
    }
    public void setSeqLength(Long seqLength) {
        this.seqLength = seqLength;
    }
    public void setSample(Sample sample) {
        this.sample = sample;
    }
    public void setSeqType(SequenceType seqType) {
        this.seqType = seqType;
    }

    // Getters
    public String getId() {
        return id;
    }
    public String getName() {
        return name;
    }
    public String getSequence() {
        return sequence;
    }
    public Long getSeqLength() {
        return seqLength;
    }
    public SequenceType getSeqType() {
        return seqType;
    }
    public Sample getSample() {
        return sample;
    }

}
