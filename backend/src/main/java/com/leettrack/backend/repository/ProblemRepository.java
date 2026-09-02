package com.leettrack.backend.repository;

import com.leettrack.backend.entity.Difficulty;
import com.leettrack.backend.entity.Problem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProblemRepository extends JpaRepository<Problem, Long> {

        long count();

        Optional<Problem> findBySlug(String slug);

        boolean existsBySlug(String slug);

        boolean existsByOrderIndex(Integer orderIndex);

        @Query("SELECT DISTINCT p.category FROM Problem p")
        List<String> findDistinctCategories();

        List<Problem> findByCategoryOrderByOrderIndexAsc(String category);

        @Query("""
                        SELECT p.category, COUNT(p)
                        FROM Problem p
                        GROUP BY p.category
                        ORDER BY p.category
                        """)
        List<Object[]> countProblemsByCategory();

        @Query("""
                        SELECT p
                        FROM Problem p
                        WHERE (:search IS NULL OR LOWER(p.title) LIKE LOWER(CONCAT('%', :search, '%')))
                        AND (:difficulty IS NULL OR p.difficulty = :difficulty)
                        AND (:category IS NULL OR p.category = :category)
                        ORDER BY p.orderIndex ASC
                        """)
        List<Problem> searchProblems(
                        @Param("search") String search,
                        @Param("difficulty") Difficulty difficulty,
                        @Param("category") String category);

        long countByDifficulty(Difficulty difficulty);
}