package com.dumij.biovault.service;

import com.dumij.biovault.exception.DuplicateEmailException;
import com.dumij.biovault.model.User;
import com.dumij.biovault.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class DefaultUserService implements UserService {

    private final UserRepository userRepository;

    public DefaultUserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User registerResearcher(User user) {

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new DuplicateEmailException("A user with this email already exists.");
        }

        return userRepository.save(user);
    }

    @Override
    public Optional<User> getByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
