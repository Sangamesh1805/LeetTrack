package com.leettrack.backend.dto;

import java.time.LocalDateTime;

public class ProgressResponse {

    private Long problemId;
    private String problemTitle;
    private boolean solved;
    private LocalDateTime solvedAt;

    public ProgressResponse() {
    }

    public ProgressResponse(
            Long problemId,
            String problemTitle,
            boolean solved,
            LocalDateTime solvedAt) {

        this.problemId = problemId;
        this.problemTitle = problemTitle;
        this.solved = solved;
        this.solvedAt = solvedAt;
    }

    public Long getProblemId() {
        return problemId;
    }

    public String getProblemTitle() {
        return problemTitle;
    }

    public boolean isSolved() {
        return solved;
    }

    public LocalDateTime getSolvedAt() {
        return solvedAt;
    }
}