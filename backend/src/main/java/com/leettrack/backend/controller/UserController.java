package com.leettrack.backend.controller;

import com.leettrack.backend.dto.LoginRequest;
import com.leettrack.backend.dto.LoginResponse;
import com.leettrack.backend.dto.RegisterRequest;
import com.leettrack.backend.dto.RegisterResponse;
import com.leettrack.backend.entity.User;
import com.leettrack.backend.service.AuthService;
import com.leettrack.backend.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    private final UserService userService;
    private final AuthService authService;

    public UserController(UserService userService, AuthService authService) {
        this.userService = userService;
        this.authService = authService;
    }

    @PostMapping("/register")
    public RegisterResponse register(@RequestBody RegisterRequest request) {

        User user = userService.registerUser(request);

        return new RegisterResponse(
                user.getId(),
                user.getName(),
                user.getEmail());
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {

        String token = authService.login(request);

        return new LoginResponse(token);
    }
}