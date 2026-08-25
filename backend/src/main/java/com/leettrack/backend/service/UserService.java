package com.leettrack.backend.service;

import com.leettrack.backend.dto.RegisterRequest;
import com.leettrack.backend.entity.AuthProvider;
import com.leettrack.backend.entity.User;
import com.leettrack.backend.exception.EmailAlreadyExistsException;
import com.leettrack.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerUser(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new EmailAlreadyExistsException("Email already registered");
        }

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());

        // This is a normal email/password account
        user.setAuthProvider(AuthProvider.LOCAL);

        // Hash the password before saving
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        return userRepository.save(user);
    }
}