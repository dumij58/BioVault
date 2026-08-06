package com.dumij.biovault.mapper;

import com.dumij.biovault.dto.RegisterRequest;
import com.dumij.biovault.dto.UserResponse;
import com.dumij.biovault.model.Role;
import com.dumij.biovault.model.User;

public class UserMapper {

    public static User toEntity(RegisterRequest request, String encodedPassword) {

        return new User(
                request.getName(),
                request.getEmail(),
                encodedPassword,
                Role.RESEARCHER,
                request.getInstitution(),
                request.getDesignation());
    }

    public static UserResponse toResponse(User user) {

        return new UserResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                user.getInstitution(),
                user.getDesignation());
    }
}
