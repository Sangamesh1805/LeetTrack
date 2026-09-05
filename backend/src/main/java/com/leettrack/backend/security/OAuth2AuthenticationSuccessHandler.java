package com.leettrack.backend.security;

import com.leettrack.backend.entity.User;
import com.leettrack.backend.repository.UserRepository;
import com.leettrack.backend.service.JwtService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import com.leettrack.backend.entity.AuthProvider;

import java.io.IOException;

@Component
public class OAuth2AuthenticationSuccessHandler
        extends SimpleUrlAuthenticationSuccessHandler {

    @Value("${app.frontend-url}")
    private String frontendUrl;

    private final UserRepository userRepository;
    private final JwtService jwtService;

    public OAuth2AuthenticationSuccessHandler(
            UserRepository userRepository,
            JwtService jwtService) {

        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication)
            throws IOException, ServletException {

        OAuth2User oauthUser = (OAuth2User) authentication.getPrincipal();

        String email = oauthUser.getAttribute("email");
        String name = oauthUser.getAttribute("name");

        User user = userRepository.findByEmail(email)
                .orElseGet(() -> {

                    User newUser = new User();

                    newUser.setName(name);
                    newUser.setEmail(email);
                    newUser.setAuthProvider(AuthProvider.GOOGLE);

                    return userRepository.save(newUser);
                });

        String token = jwtService.generateToken(user.getEmail());

        response.sendRedirect(
                frontendUrl + "/oauth-success?token=" + token);
    }
}