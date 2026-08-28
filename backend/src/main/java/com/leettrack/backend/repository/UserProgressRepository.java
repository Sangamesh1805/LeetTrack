package com.leettrack.backend.repository;

import com.leettrack.backend.entity.Difficulty;
import com.leettrack.backend.entity.UserProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserProgressRepository
                extends JpaRepository<UserProgress, Long> {

        Optional<UserProgress> findByUserIdAndProblemId(
                        Long userId,
                        Long problemId);

        long countByUserIdAndSolvedTrue(Long userId);

        List<UserProgress> findByUserId(Long userId);

        long countByUserIdAndSolvedTrueAndProblemDifficulty(
                        Long userId,
                        Difficulty difficulty);

        @Query("""
                        SELECT p, up
                        FROM Problem p
                        LEFT JOIN UserProgress up
                            ON up.problem.id = p.id
                            AND up.user.id = :userId
                        WHERE p.category = :category
                        ORDER BY p.orderIndex ASC
                        """)
        List<Object[]> findProblemsWithProgress(
                        @Param("userId") Long userId,
                        @Param("category") String category);
}