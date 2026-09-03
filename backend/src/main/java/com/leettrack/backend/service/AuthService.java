package com.leettrack.backend.service;

import com.leettrack.backend.dto.ForgotPasswordRequest;
import com.leettrack.backend.dto.LoginRequest;
import com.leettrack.backend.dto.ResetPasswordRequest;
import com.leettrack.backend.entity.AuthProvider;
import com.leettrack.backend.entity.PasswordResetToken;
import com.leettrack.backend.entity.User;
import com.leettrack.backend.repository.PasswordResetTokenRepository;
import com.leettrack.backend.repository.UserRepository;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Base64;

@Service
public class AuthService {

        private final UserRepository userRepository;
        private final PasswordEncoder passwordEncoder;
        private final JwtService jwtService;
        private final PasswordResetTokenRepository passwordResetTokenRepository;
        private final EmailService emailService;

        private final SecureRandom secureRandom = new SecureRandom();

        public AuthService(
                        UserRepository userRepository,
                        PasswordEncoder passwordEncoder,
                        JwtService jwtService,
                        PasswordResetTokenRepository passwordResetTokenRepository,
                        EmailService emailService) {

                this.userRepository = userRepository;
                this.passwordEncoder = passwordEncoder;
                this.jwtService = jwtService;
                this.passwordResetTokenRepository = passwordResetTokenRepository;
                this.emailService = emailService;
        }

        public String login(LoginRequest request) {

                User user = userRepository.findByEmail(request.getEmail())
                                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

                if (!passwordEncoder.matches(
                                request.getPassword(),
                                user.getPassword())) {

                        throw new RuntimeException("Invalid email or password");
                }

                return jwtService.generateToken(user.getEmail());
        }

        @Transactional
        public void forgotPassword(ForgotPasswordRequest request) {

                User user = userRepository.findByEmail(request.getEmail())
                                .orElse(null);

                if (user == null) {
                        return;
                }

                if (user.getAuthProvider() != AuthProvider.LOCAL) {
                        return;
                }

                // Remove any existing reset token
                passwordResetTokenRepository.deleteByUserId(user.getId());
                passwordResetTokenRepository.flush();

                // Generate a secure random token
                byte[] randomBytes = new byte[32];
                secureRandom.nextBytes(randomBytes);

                String token = Base64.getUrlEncoder()
                                .withoutPadding()
                                .encodeToString(randomBytes);

                PasswordResetToken resetToken = new PasswordResetToken();

                resetToken.setToken(token);
                resetToken.setUser(user);
                resetToken.setExpiresAt(
                                LocalDateTime.now().plusMinutes(15));

                passwordResetTokenRepository.save(resetToken);

                emailService.sendPasswordResetEmail(
                                user.getEmail(),
                                token);
        }

        @Transactional
        public void resetPassword(ResetPasswordRequest request) {

                PasswordResetToken resetToken = passwordResetTokenRepository
                                .findByToken(request.getToken())
                                .orElseThrow(() -> new RuntimeException(
                                                "Invalid or expired reset token"));

                if (resetToken.getExpiresAt()
                                .isBefore(LocalDateTime.now())) {

                        passwordResetTokenRepository.delete(resetToken);

                        throw new RuntimeException(
                                        "Invalid or expired reset token");
                }

                User user = resetToken.getUser();

                user.setPassword(
                                passwordEncoder.encode(request.getPassword()));

                userRepository.save(user);

                passwordResetTokenRepository.delete(resetToken);
        }
}