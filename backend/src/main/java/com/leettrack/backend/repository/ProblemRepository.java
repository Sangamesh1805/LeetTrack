package com.leettrack.backend.repository;

import com.leettrack.backend.entity.Problem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

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
}