package com.dumij.biovault.mapper;

import com.dumij.biovault.dto.ResearcherRequest;
import com.dumij.biovault.dto.ResearcherResponse;
import com.dumij.biovault.model.Researcher;
import java.util.List;

public class ResearcherMapper {

    public static Researcher toEntity(ResearcherRequest request) {

        return new Researcher(
                request.getName(),
                request.getEmail(),
                request.getDepartment(),
                request.getDesignation()
        );
    }

    public static ResearcherResponse toResponse(Researcher researcher) {

        return new ResearcherResponse(
                researcher.getId(),
                researcher.getName(),
                researcher.getEmail(),
                researcher.getDepartment(),
                researcher.getDesignation()
        );
    }

    public static List<ResearcherResponse> toResponseList(
            List<Researcher> researchers) {

        return researchers.stream()
                .map(ResearcherMapper::toResponse)
                .toList();

    }
}