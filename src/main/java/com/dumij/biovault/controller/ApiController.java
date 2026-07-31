package com.dumij.biovault.controller;

import com.dumij.biovault.dto.PingResponse;
import com.dumij.biovault.service.PingService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1")
public class ApiController {

    private final PingService pingService;

    public ApiController(PingService pingService) {
        this.pingService = pingService;
    }

    @GetMapping("ping")
    public PingResponse ping() {
        return pingService.ping();
    }

}