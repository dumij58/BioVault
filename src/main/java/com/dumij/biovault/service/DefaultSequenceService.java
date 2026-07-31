package com.dumij.biovault.service;

import com.dumij.biovault.dto.sequence.CalcLengthRequest;
import com.dumij.biovault.dto.sequence.CalcLengthResponse;
import com.dumij.biovault.dto.sequence.SaveSequenceRequest;
import com.dumij.biovault.dto.sequence.SequenceDetailResponse;
import com.dumij.biovault.dto.sequence.SequenceListResponse;
import com.dumij.biovault.mapper.SequenceMapper;
import com.dumij.biovault.model.Sequence;
import com.dumij.biovault.repository.SequenceRepository;

import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
public class DefaultSequenceService implements SequenceService {

    private final SequenceRepository sequenceRepository;
    private final SequenceMapper sequenceMapper;

    public DefaultSequenceService(SequenceRepository sequenceRepository, SequenceMapper sequenceMapper) {
        this.sequenceRepository = sequenceRepository;
        this.sequenceMapper = sequenceMapper;
    }

    @Override
    public String sequenceStatus() {
        long sequenceCount = sequenceRepository.count();
        return "sequence-count:" + sequenceCount;
    }

    @Override
    public SequenceDetailResponse saveSeq(SaveSequenceRequest request) {
        Sequence seq = sequenceMapper.toEntity(request);
        Sequence saved = sequenceRepository.save(seq);
        return sequenceMapper.toDetailResponse(saved);
    }

    @Override
    public SequenceListResponse listAll() {
        return sequenceMapper.toListResponse(sequenceRepository.findAll());
    }

    @Override
    public void deleteSequence(String id) {
        sequenceRepository.deleteById(id);
    }

    @Override
    public SequenceDetailResponse getSequenceById(String id) {
        Sequence sequence = sequenceRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Sequence not found: " + id));
        return sequenceMapper.toDetailResponse(sequence);
    }

    @Override
    public CalcLengthResponse calcSeqLength(CalcLengthRequest request) {
        return new CalcLengthResponse(sequenceMapper.toLength(request));
    }

    @Override
    public SequenceDetailResponse updateSeq(String id, SaveSequenceRequest request) {
        Sequence existing = sequenceRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Sequence not found: " + id));

        if (request.sequence() != null) {
            existing.setSequence(request.sequence());
        }

        if (request.seqLength() != null) {
            existing.setSeqLength(request.seqLength());
        } else if (request.sequence() != null) {
            existing.setSeqLength((long) request.sequence().length());
        }

        Sequence updated = sequenceRepository.save(existing);
        return sequenceMapper.toDetailResponse(updated);
    }
}
