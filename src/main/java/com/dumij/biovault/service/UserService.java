package com.dumij.biovault.service;

import com.dumij.biovault.model.User;
import java.util.Optional;

public interface UserService {

    User registerResearcher(User user);

    Optional<User> getByEmail(String email);
}
