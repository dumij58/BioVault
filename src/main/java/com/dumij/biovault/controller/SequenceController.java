package com.dumij.biovault.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.dumij.biovault.dto.sequence.CalcLengthRequest;
import com.dumij.biovault.dto.sequence.CalcLengthResponse;
import com.dumij.biovault.dto.sequence.SaveSequenceRequest;
import com.dumij.biovault.dto.sequence.SequenceDetailResponse;
import com.dumij.biovault.dto.sequence.SequenceListResponse;
import com.dumij.biovault.service.SequenceService;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("api/v1/sequence")
public class SequenceController {

    private final SequenceService sequenceService;

    public SequenceController(SequenceService sequenceService) {
        this.sequenceService = sequenceService;
    }
    
    @PostMapping("/save")
    public SequenceDetailResponse addSequence(@RequestBody SaveSequenceRequest request) {
        return sequenceService.saveSeq(request);
    }

    @GetMapping("/getall")
    public SequenceListResponse getSequences() {
        return sequenceService.listAll();
    }

    @DeleteMapping("/delete/{id}")
    public void deleteSequence(@PathVariable("id") String id) {
        sequenceService.deleteSequence(id);
    }

    @PutMapping("/update/{id}")
    public SequenceDetailResponse updateSequence(@PathVariable("id") String id, @RequestBody SaveSequenceRequest request) {
        return sequenceService.updateSeq(id, request);
    }
    
    @PostMapping("/calclength")
    public CalcLengthResponse calcSeqLength(@RequestBody CalcLengthRequest request) {
        return sequenceService.calcSeqLength(request);
    }
    
    @GetMapping("/{id}")
    public SequenceDetailResponse getSequence(@PathVariable("id") String id) {
        return sequenceService.getSequenceById(id);
    }

}
