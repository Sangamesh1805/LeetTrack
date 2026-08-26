package com.leettrack.backend.service;

import com.leettrack.backend.entity.Problem;
import com.leettrack.backend.entity.User;
import com.leettrack.backend.entity.UserProgress;
import com.leettrack.backend.entity.RevisionHistory;
import com.leettrack.backend.repository.RevisionHistoryRepository;
import com.leettrack.backend.repository.ProblemRepository;
import com.leettrack.backend.repository.UserProgressRepository;
import com.leettrack.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserProgressService {

    private final UserProgressRepository userProgressRepository;
    private final UserRepository userRepository;
    private final ProblemRepository problemRepository;
    private final RevisionHistoryRepository revisionHistoryRepository;

    public UserProgressService(
            UserProgressRepository userProgressRepository,
            UserRepository userRepository,
            ProblemRepository problemRepository,
            RevisionHistoryRepository revisionHistoryRepository) {

        this.userProgressRepository = userProgressRepository;
        this.userRepository = userRepository;
        this.problemRepository = problemRepository;
        this.revisionHistoryRepository = revisionHistoryRepository;
    }

    public UserProgress markProblemAsSolved(
            Long userId,
            Long problemId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Problem problem = problemRepository.findById(problemId)
                .orElseThrow(() -> new RuntimeException("Problem not found"));

        UserProgress progress = userProgressRepository
                .findByUserIdAndProblemId(userId, problemId)
                .orElseGet(() -> {

                    UserProgress newProgress = new UserProgress();

                    newProgress.setUser(user);
                    newProgress.setProblem(problem);

                    return newProgress;
                });

        progress.setSolved(true);
        progress.setSolvedAt(LocalDateTime.now());

        return userProgressRepository.save(progress);
    }

    public RevisionHistory markProblemAsRevised(
            Long userId,
            Long problemId) {

        UserProgress progress = userProgressRepository
                .findByUserIdAndProblemId(userId, problemId)
                .orElseThrow(() -> new RuntimeException(
                        "Problem has not been solved yet"));

        if (!progress.isSolved()) {
            throw new RuntimeException(
                    "Problem must be solved before revision");
        }

        long revisionCount = revisionHistoryRepository
                .countByUserProgressId(progress.getId());

        RevisionHistory revision = new RevisionHistory();

        revision.setUserProgress(progress);
        revision.setRevisionNumber((int) revisionCount + 1);
        revision.setRevisedAt(LocalDateTime.now());

        return revisionHistoryRepository.save(revision);
    }

    public List<RevisionHistory> getRevisionHistory(
            Long userId,
            Long problemId) {

        UserProgress progress = userProgressRepository
                .findByUserIdAndProblemId(userId, problemId)
                .orElseThrow(() -> new RuntimeException(
                        "No progress found for this problem"));

        return revisionHistoryRepository
                .findByUserProgressIdOrderByRevisionNumberAsc(
                        progress.getId());
    }

    public long getSolvedCount(Long userId) {
        return userProgressRepository
                .countByUserIdAndSolvedTrue(userId);
    }
}