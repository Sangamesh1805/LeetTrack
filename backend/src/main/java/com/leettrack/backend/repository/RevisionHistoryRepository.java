package com.leettrack.backend.repository;

import com.leettrack.backend.entity.RevisionHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RevisionHistoryRepository
                extends JpaRepository<RevisionHistory, Long> {

        List<RevisionHistory> findByUserProgressIdOrderByRevisionNumberAsc(
                        Long userProgressId);

        long countByUserProgressId(Long userProgressId);

        long countByUserProgressUserId(Long userId);
}