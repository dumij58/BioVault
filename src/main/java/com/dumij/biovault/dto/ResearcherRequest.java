package com.dumij.biovault.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ResearcherRequest {

    @NotBlank(message = "Name is required")
    @Size(max = 100, message = "Name cannot exceed 100 characters")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    private String email;

    @NotBlank(message = "Department is required")
    private String department;

    @NotBlank(message = "Designation is required")
    private String designation;

    public ResearcherRequest() {
    }

    public ResearcherRequest(String name,
            String email,
            String institution,
            String designation) {

        this.name = name;
        this.email = email;
        this.department = institution;
        this.designation = designation;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getInstitution() {
        return department;
    }

    public void setInstitution(String institution) {
        this.department = institution;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }
}