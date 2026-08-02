package com.dumij.biovault.dto.sequence;

import java.util.List;

public record SequenceListResponse(List<SequenceDetailResponse> sequences, long total) {
}
