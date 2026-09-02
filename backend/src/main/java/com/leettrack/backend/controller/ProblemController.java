package com.leettrack.backend.controller;

import com.leettrack.backend.entity.Difficulty;
import com.leettrack.backend.entity.Problem;
import com.leettrack.backend.repository.ProblemRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/problems")
public class ProblemController {

    private final ProblemRepository problemRepository;

    public ProblemController(ProblemRepository problemRepository) {
        this.problemRepository = problemRepository;
    }

    @GetMapping
    public List<Problem> getAllProblems() {
        return problemRepository.findAll();
    }

    @GetMapping("/categories")
    public List<String> getCategories() {
        return problemRepository.findDistinctCategories();
    }

    @GetMapping("/category/{category}")
    public List<Problem> getProblemsByCategory(
            @PathVariable String category) {

        return problemRepository
                .findByCategoryOrderByOrderIndexAsc(category);
    }

    @GetMapping("/search")
    public List<Problem> searchProblems(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Difficulty difficulty,
            @RequestParam(required = false) String category) {

        return problemRepository.searchProblems(
                search,
                difficulty,
                category);
    }

    @GetMapping("/{id}")
    public Problem getProblemById(@PathVariable Long id) {
        return problemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Problem not found"));
    }

    @GetMapping("/slug/{slug}")
    public Problem getProblemBySlug(@PathVariable String slug) {
        return problemRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Problem not found"));
    }
}