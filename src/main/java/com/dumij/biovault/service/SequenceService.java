package com.dumij.biovault.service;

import com.dumij.biovault.dto.sequence.CalcLengthRequest;
import com.dumij.biovault.dto.sequence.CalcLengthResponse;
import com.dumij.biovault.dto.sequence.SaveSequenceRequest;
import com.dumij.biovault.dto.sequence.SequenceDetailResponse;
import com.dumij.biovault.dto.sequence.SequenceListResponse;

public interface SequenceService {
    String sequenceStatus();

    SequenceDetailResponse saveSeq(SaveSequenceRequest request);

    SequenceListResponse listAll();

    void deleteSequence(String id);

    SequenceDetailResponse getSequenceById(String id);

    CalcLengthResponse calcSeqLength(CalcLengthRequest request);

    SequenceDetailResponse updateSeq(String id, SaveSequenceRequest request);
}
