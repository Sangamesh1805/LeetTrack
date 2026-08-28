package com.leettrack.backend.service;

import com.leettrack.backend.dto.CategoryStatsResponse;
import com.leettrack.backend.dto.ProblemProgressResponse;
import com.leettrack.backend.dto.ProgressStatsResponse;
import com.leettrack.backend.entity.Difficulty;
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
import java.util.Map;
import java.util.stream.Collectors;

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

        public ProgressStatsResponse getProgressStats(Long userId) {

                long totalProblems = problemRepository.count();

                long solved = userProgressRepository
                                .countByUserIdAndSolvedTrue(userId);

                long remaining = totalProblems - solved;

                double progressPercentage = totalProblems == 0
                                ? 0
                                : ((double) solved / totalProblems) * 100;

                long easySolved = userProgressRepository
                                .countByUserIdAndSolvedTrueAndProblemDifficulty(
                                                userId,
                                                Difficulty.EASY);

                long mediumSolved = userProgressRepository
                                .countByUserIdAndSolvedTrueAndProblemDifficulty(
                                                userId,
                                                Difficulty.MEDIUM);

                long hardSolved = userProgressRepository
                                .countByUserIdAndSolvedTrueAndProblemDifficulty(
                                                userId,
                                                Difficulty.HARD);

                long totalRevisions = revisionHistoryRepository
                                .countByUserProgressUserId(userId);

                return new ProgressStatsResponse(
                                totalProblems,
                                solved,
                                remaining,
                                progressPercentage,
                                easySolved,
                                mediumSolved,
                                hardSolved,
                                totalRevisions);
        }

        public List<ProblemProgressResponse> getProblemsByCategory(
                        Long userId,
                        String category) {

                List<Object[]> results = userProgressRepository.findProblemsWithProgress(
                                userId,
                                category);

                return results.stream()
                                .map(row -> {

                                        Problem problem = (Problem) row[0];
                                        UserProgress progress = (UserProgress) row[1];

                                        return new ProblemProgressResponse(
                                                        problem.getId(),
                                                        problem.getTitle(),
                                                        problem.getDifficulty(),
                                                        problem.getLeetcodeUrl(),
                                                        problem.getOrderIndex(),
                                                        progress != null && progress.isSolved(),
                                                        progress != null
                                                                        ? progress.getSolvedAt()
                                                                        : null);
                                })
                                .toList();
        }

        public List<UserProgress> getUserProgress(Long userId) {

                return userProgressRepository.findByUserId(userId);
        }

        public List<CategoryStatsResponse> getCategoryStats(Long userId) {

                List<Object[]> totalResults = problemRepository.countProblemsByCategory();

                List<Object[]> solvedResults = userProgressRepository.countSolvedProblemsByCategory(userId);

                Map<String, Long> solvedByCategory = solvedResults.stream()
                                .collect(Collectors.toMap(
                                                row -> (String) row[0],
                                                row -> (Long) row[1]));

                return totalResults.stream()
                                .map(row -> {
                                        String category = (String) row[0];
                                        long total = (Long) row[1];

                                        long solved = solvedByCategory.getOrDefault(
                                                        category,
                                                        0L);

                                        return new CategoryStatsResponse(
                                                        category,
                                                        total,
                                                        solved);
                                })
                                .toList();
        }

        public long getSolvedCount(Long userId) {
                return userProgressRepository
                                .countByUserIdAndSolvedTrue(userId);
        }
}