package com.dumij.biovault.config;

import com.dumij.biovault.model.Role;
import com.dumij.biovault.model.User;
import com.dumij.biovault.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminSeeder implements ApplicationRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.admin.email}")
    private String adminEmail;

    @Value("${app.admin.password}")
    private String adminPassword;

    @Value("${app.admin.name}")
    private String adminName;

    public AdminSeeder(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(ApplicationArguments args) {

        if (userRepository.findByEmail(adminEmail).isPresent()) {
            return;
        }

        User admin = new User(
                adminName,
                adminEmail,
                passwordEncoder.encode(adminPassword),
                Role.ADMIN,
                null,
                null
        );

        userRepository.save(admin);
    }
}
