package com.leettrack.backend.dto;

public class ProgressStatsResponse {

    private long totalProblems;
    private long solved;
    private long remaining;
    private double progressPercentage;

    private long easySolved;
    private long mediumSolved;
    private long hardSolved;

    private long totalRevisions;

    public ProgressStatsResponse() {
    }

    public ProgressStatsResponse(
            long totalProblems,
            long solved,
            long remaining,
            double progressPercentage,
            long easySolved,
            long mediumSolved,
            long hardSolved,
            long totalRevisions) {

        this.totalProblems = totalProblems;
        this.solved = solved;
        this.remaining = remaining;
        this.progressPercentage = progressPercentage;
        this.easySolved = easySolved;
        this.mediumSolved = mediumSolved;
        this.hardSolved = hardSolved;
        this.totalRevisions = totalRevisions;
    }

    public long getTotalProblems() {
        return totalProblems;
    }

    public long getSolved() {
        return solved;
    }

    public long getRemaining() {
        return remaining;
    }

    public double getProgressPercentage() {
        return progressPercentage;
    }

    public long getEasySolved() {
        return easySolved;
    }

    public long getMediumSolved() {
        return mediumSolved;
    }

    public long getHardSolved() {
        return hardSolved;
    }

    public long getTotalRevisions() {
        return totalRevisions;
    }
}