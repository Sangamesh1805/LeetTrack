package com.leettrack.backend.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_progress", uniqueConstraints = {
        @UniqueConstraint(columnNames = { "user_id", "problem_id" })
})
public class UserProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "problem_id", nullable = false)
    private Problem problem;

    @Column(nullable = false)
    private boolean solved = false;

    private LocalDateTime solvedAt;

    public UserProgress() {
    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public Problem getProblem() {
        return problem;
    }

    public boolean isSolved() {
        return solved;
    }

    public LocalDateTime getSolvedAt() {
        return solvedAt;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setProblem(Problem problem) {
        this.problem = problem;
    }

    public void setSolved(boolean solved) {
        this.solved = solved;
    }

    public void setSolvedAt(LocalDateTime solvedAt) {
        this.solvedAt = solvedAt;
    }
}