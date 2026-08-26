package com.leettrack.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "problems")
public class Problem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, unique = true)
    private String slug;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Difficulty difficulty;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private String leetcodeUrl;

    @Column(nullable = false, unique = true)
    private Integer orderIndex;

    public Problem() {
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getSlug() {
        return slug;
    }

    public Difficulty getDifficulty() {
        return difficulty;
    }

    public String getCategory() {
        return category;
    }

    public String getLeetcodeUrl() {
        return leetcodeUrl;
    }

    public Integer getOrderIndex() {
        return orderIndex;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public void setDifficulty(Difficulty difficulty) {
        this.difficulty = difficulty;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setLeetcodeUrl(String leetcodeUrl) {
        this.leetcodeUrl = leetcodeUrl;
    }

    public void setOrderIndex(Integer orderIndex) {
        this.orderIndex = orderIndex;
    }
}