package com.leettrack.backend.repository;

import com.leettrack.backend.entity.UserProgress;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserProgressRepository
        extends JpaRepository<UserProgress, Long> {

    Optional<UserProgress> findByUserIdAndProblemId(
            Long userId,
            Long problemId);

    long countByUserIdAndSolvedTrue(Long userId);
}