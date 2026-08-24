package com.leettrack.backend.controller;

import com.leettrack.backend.dto.RegisterRequest;
import com.leettrack.backend.dto.RegisterResponse;
import com.leettrack.backend.entity.User;
import com.leettrack.backend.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public RegisterResponse register(@RequestBody RegisterRequest request) {

        User user = userService.registerUser(request);

        return new RegisterResponse(
                user.getId(),
                user.getName(),
                user.getEmail());
    }
}