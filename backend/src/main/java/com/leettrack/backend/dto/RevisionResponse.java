package com.leettrack.backend.dto;

import java.time.LocalDateTime;

public class RevisionResponse {

    private Integer revisionNumber;
    private LocalDateTime revisedAt;

    public RevisionResponse() {
    }

    public RevisionResponse(
            Integer revisionNumber,
            LocalDateTime revisedAt) {

        this.revisionNumber = revisionNumber;
        this.revisedAt = revisedAt;
    }

    public Integer getRevisionNumber() {
        return revisionNumber;
    }

    public LocalDateTime getRevisedAt() {
        return revisedAt;
    }
}