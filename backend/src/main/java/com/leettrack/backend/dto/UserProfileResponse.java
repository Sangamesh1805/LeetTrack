package com.leettrack.backend.dto;

import com.leettrack.backend.entity.AuthProvider;

public class UserProfileResponse {

    private Long id;
    private String name;
    private String email;
    private AuthProvider authProvider;

    public UserProfileResponse() {
    }

    public UserProfileResponse(Long id, String name, String email, AuthProvider authProvider) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.authProvider = authProvider;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public AuthProvider getAuthProvider() {
        return authProvider;
    }
}