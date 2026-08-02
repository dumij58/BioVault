package com.dumij.biovault.mapper;

import com.dumij.biovault.dto.sequence.CalcLengthRequest;
import com.dumij.biovault.dto.sequence.SaveSequenceRequest;
import com.dumij.biovault.dto.sequence.SequenceDetailResponse;
import com.dumij.biovault.dto.sequence.SequenceListResponse;
import com.dumij.biovault.model.Sequence;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class SequenceMapper {

    public Sequence toEntity(SaveSequenceRequest request) {
        Sequence sequence = new Sequence();
        sequence.setSequence(request.sequence());

        if (request.seqLength() != null) {
            sequence.setSeqLength(request.seqLength());
        } else if (request.sequence() != null) {
            sequence.setSeqLength((long) request.sequence().length());
        }

        return sequence;
    }

    public SequenceDetailResponse toDetailResponse(Sequence sequence) {
        return new SequenceDetailResponse(
                sequence.getId(),
                sequence.getSequence(),
                sequence.getSeqLength()
        );
    }

    public SequenceListResponse toListResponse(Iterable<Sequence> sequences) {
        List<SequenceDetailResponse> items = new ArrayList<>();
        for (Sequence sequence : sequences) {
            items.add(toDetailResponse(sequence));
        }
        return new SequenceListResponse(items, items.size());
    }

    public long toLength(CalcLengthRequest request) {
        if (request.seqLength() != null) {
            return request.seqLength();
        }
        if (request.sequence() != null) {
            return request.sequence().length();
        }
        return 0L;
    }
}
