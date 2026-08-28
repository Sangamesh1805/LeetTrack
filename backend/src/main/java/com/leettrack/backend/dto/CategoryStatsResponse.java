package com.leettrack.backend.dto;

public class CategoryStatsResponse {

    private String category;
    private long total;
    private long solved;

    public CategoryStatsResponse(
            String category,
            long total,
            long solved) {

        this.category = category;
        this.total = total;
        this.solved = solved;
    }

    public String getCategory() {
        return category;
    }

    public long getTotal() {
        return total;
    }

    public long getSolved() {
        return solved;
    }
}