package com.leettrack.backend.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "revision_history")
public class RevisionHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_progress_id", nullable = false)
    private UserProgress userProgress;

    @Column(nullable = false)
    private Integer revisionNumber;

    @Column(nullable = false)
    private LocalDateTime revisedAt;

    public RevisionHistory() {
    }

    public Long getId() {
        return id;
    }

    public UserProgress getUserProgress() {
        return userProgress;
    }

    public Integer getRevisionNumber() {
        return revisionNumber;
    }

    public LocalDateTime getRevisedAt() {
        return revisedAt;
    }

    public void setUserProgress(UserProgress userProgress) {
        this.userProgress = userProgress;
    }

    public void setRevisionNumber(Integer revisionNumber) {
        this.revisionNumber = revisionNumber;
    }

    public void setRevisedAt(LocalDateTime revisedAt) {
        this.revisedAt = revisedAt;
    }
}