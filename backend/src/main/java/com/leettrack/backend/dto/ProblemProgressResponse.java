package com.leettrack.backend.dto;

import com.leettrack.backend.entity.Difficulty;

import java.time.LocalDateTime;

public class ProblemProgressResponse {

    private Long problemId;
    private String title;
    private Difficulty difficulty;
    private String leetcodeUrl;
    private Integer orderIndex;
    private boolean solved;
    private LocalDateTime solvedAt;

    public ProblemProgressResponse(
            Long problemId,
            String title,
            Difficulty difficulty,
            String leetcodeUrl,
            Integer orderIndex,
            boolean solved,
            LocalDateTime solvedAt) {

        this.problemId = problemId;
        this.title = title;
        this.difficulty = difficulty;
        this.leetcodeUrl = leetcodeUrl;
        this.orderIndex = orderIndex;
        this.solved = solved;
        this.solvedAt = solvedAt;
    }

    public Long getProblemId() {
        return problemId;
    }

    public String getTitle() {
        return title;
    }

    public Difficulty getDifficulty() {
        return difficulty;
    }

    public String getLeetcodeUrl() {
        return leetcodeUrl;
    }

    public Integer getOrderIndex() {
        return orderIndex;
    }

    public boolean isSolved() {
        return solved;
    }

    public LocalDateTime getSolvedAt() {
        return solvedAt;
    }
}