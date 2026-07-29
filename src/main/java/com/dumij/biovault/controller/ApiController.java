package com.dumij.biovault.controller;

import com.dumij.biovault.dto.PingResponse;
import com.dumij.biovault.service.PingService;
import com.dumij.biovault.service.SequenceService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1")
public class ApiController {

    private final PingService pingService;
    private final SequenceService sequenceService;

    public ApiController(PingService pingService, SequenceService sequenceService) {
        this.pingService = pingService;
        this.sequenceService = sequenceService;
    }

    @GetMapping("ping")
    public PingResponse ping() {
        return pingService.ping();
    }

    @GetMapping("sequence")
    public String sequence() {
        return sequenceService.sequenceStatus();
    }

}