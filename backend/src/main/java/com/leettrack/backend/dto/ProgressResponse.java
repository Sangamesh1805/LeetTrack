package com.leettrack.backend.dto;

import java.time.LocalDateTime;

public class ProgressResponse {

    private Long problemId;
    private String problemTitle;
    private boolean solved;
    private LocalDateTime solvedAt;
    private long revisionCount;

    public ProgressResponse() {
    }

    public ProgressResponse(
            Long problemId,
            String problemTitle,
            boolean solved,
            LocalDateTime solvedAt,
            long revisionCount) {

        this.problemId = problemId;
        this.problemTitle = problemTitle;
        this.solved = solved;
        this.solvedAt = solvedAt;
        this.revisionCount = revisionCount;
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

    public long getRevisionCount() {
        return revisionCount;
    }
}