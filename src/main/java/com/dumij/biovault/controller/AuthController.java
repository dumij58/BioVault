package com.dumij.biovault.controller;

import com.dumij.biovault.dto.RegisterRequest;
import com.dumij.biovault.dto.UserResponse;
import com.dumij.biovault.exception.DuplicateEmailException;
import com.dumij.biovault.exception.UserNotFoundException;
import com.dumij.biovault.mapper.UserMapper;
import com.dumij.biovault.model.Researcher;
import com.dumij.biovault.model.User;
import com.dumij.biovault.service.ResearcherService;
import com.dumij.biovault.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/auth")
public class AuthController {

    private final UserService userService;
    private final ResearcherService researcherService;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserService userService, ResearcherService researcherService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.researcherService = researcherService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@Valid @RequestBody RegisterRequest request) {

        User user = UserMapper.toEntity(request, passwordEncoder.encode(request.getPassword()));

        User savedUser = userService.registerResearcher(user);

        // Keep the researcher directory in sync with newly registered users; ignore if one already exists.
        try {
            researcherService.createResearcher(new Researcher(
                    savedUser.getName(),
                    savedUser.getEmail(),
                    savedUser.getInstitution(),
                    savedUser.getDesignation()
            ));
        } catch (DuplicateEmailException ignored) {
        }

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(UserMapper.toResponse(savedUser));
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> me(Authentication authentication) {

        User user = userService.getByEmail(authentication.getName())
                .orElseThrow(() -> new UserNotFoundException("User not found."));

        return ResponseEntity.ok(UserMapper.toResponse(user));
    }
}
