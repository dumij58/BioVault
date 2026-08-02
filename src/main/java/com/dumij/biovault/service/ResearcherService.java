package com.dumij.biovault.service;

import com.dumij.biovault.model.Researcher;
import java.util.List;
import java.util.Optional;

public interface ResearcherService {

    Researcher createResearcher(Researcher researcher);

    List<Researcher> getAllResearchers();

    Optional<Researcher> getResearcherById(String id);

    Researcher updateResearcher(String id, Researcher researcher);

    void deleteResearcher(String id);

}
