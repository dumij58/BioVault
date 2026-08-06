package com.dumij.biovault.service;

import org.springframework.stereotype.Service;

import com.dumij.biovault.dto.PingResponse;

@Service
public class DefaultPingService implements PingService {
    @Override
    public PingResponse ping() {
        return new PingResponse("pong");
    }
}
