package com.dumij.biovault.dto.sequence;

public record SaveSequenceRequest(String name, String sequence, Long seqLength, String seqTypeId, String sampleId) {
}
