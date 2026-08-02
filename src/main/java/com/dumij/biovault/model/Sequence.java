package com.dumij.biovault.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "sequences")
public class Sequence {
    @Id
    private String id;
    private String sequence;
    private Long seqLength;

    //@DBRef
    //private SequenceType seqType;

    // Setters
    public void setId(String id) {
        this.id = id;
    }
    public void setSequence(String sequence) {
        this.sequence = sequence;
    }
    public void setSeqLength(Long seqLength) {
        this.seqLength = seqLength;
    }

    // Getters
    public String getId() {
        return id;
    }
    public String getSequence() {
        return sequence;
    }
    public Long getSeqLength() {
        return seqLength;
    }
    //public SequenceType getSeqType() {
    //    return seqType;
    //}
}
