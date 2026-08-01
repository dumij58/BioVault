package com.dumij.biovault.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
@Document(collection = "research_projects")
public class ResearchProject {
    @Id
    private String id;

    private String title;

    private String description;

    private LocalDate startDate;

    private LocalDate endDate;

    private String status;

    private String principalResearcherId;

    public ResearchProject() {}

    public String getId() {

        return id;
    }
    public void setId(String id) {

        this.id = id;
    }
    public String getTitle() {

        return title;
    }
    public void setTitle(String title) {

        this.title = title;
    }
    public String getDescription() {

        return description;
    }
    public void setDescription(String description) {

        this.description = description;
    }
    public LocalDate getStartDate() {

        return startDate;
    }
    public void setStartDate(LocalDate startDate) {

        this.startDate = startDate;
    }
    public LocalDate getEndDate() {

        return endDate;
    }
    public void setEndDate(LocalDate endDate) {

        this.endDate = endDate;
    }
    public String getStatus() {

        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public String getPrincipalResearcherId() {
        return principalResearcherId;
    }
    public void setPrincipalResearcherId(String principalResearcherId) {
        this.principalResearcherId = principalResearcherId;
    }
}
