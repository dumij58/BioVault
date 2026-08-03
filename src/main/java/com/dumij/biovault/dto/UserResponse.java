package com.dumij.biovault.dto;

import com.dumij.biovault.model.Role;

public class UserResponse {

    private String id;
    private String name;
    private String email;
    private Role role;
    private String institution;
    private String designation;

    public UserResponse() {
    }

    public UserResponse(String id,
                         String name,
                         String email,
                         Role role,
                         String institution,
                         String designation) {

        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.institution = institution;
        this.designation = designation;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getInstitution() {
        return institution;
    }

    public void setInstitution(String institution) {
        this.institution = institution;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }
}
