package com.dumij.biovault.dto.sequence;

public record SequenceDetailResponse(String id, String name, String sequence, Long seqLength, String seqTypeId, String sampleId) {
}
