package com.dumij.biovault.service;

import com.dumij.biovault.dto.PingResponse;
import org.springframework.stereotype.Service;

@Service
public class DefaultPingService implements PingService {
    @Override
    public PingResponse ping() {
        return new PingResponse("pong");
    }
}
