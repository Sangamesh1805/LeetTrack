package com.leettrack.backend.controller;

import com.leettrack.backend.entity.User;
import com.leettrack.backend.entity.UserProgress;
import com.leettrack.backend.repository.UserRepository;
import com.leettrack.backend.service.UserProgressService;
import com.leettrack.backend.entity.RevisionHistory;
import com.leettrack.backend.dto.ProgressStatsResponse;
import org.springframework.http.ResponseEntity;

import com.leettrack.backend.dto.CategoryStatsResponse;
import com.leettrack.backend.dto.ProblemProgressResponse;
import com.leettrack.backend.dto.ProgressResponse;
import com.leettrack.backend.dto.RevisionHistoryResponse;
import com.leettrack.backend.dto.RevisionResponse;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/progress")
public class UserProgressController {

        private final UserProgressService userProgressService;
        private final UserRepository userRepository;

        public UserProgressController(
                        UserProgressService userProgressService,
                        UserRepository userRepository) {

                this.userProgressService = userProgressService;
                this.userRepository = userRepository;
        }

        @GetMapping
        public ResponseEntity<List<ProgressResponse>> getUserProgress(
                        Authentication authentication) {

                String email = authentication.getName();

                User user = userRepository.findByEmail(email)
                                .orElseThrow(() -> new RuntimeException("User not found"));

                List<UserProgress> progressList = userProgressService.getUserProgress(user.getId());

                List<ProgressResponse> response = progressList.stream()
                                .map(progress -> new ProgressResponse(
                                                progress.getProblem().getId(),
                                                progress.getProblem().getTitle(),
                                                progress.isSolved(),
                                                progress.getSolvedAt(),
                                                userProgressService.getRevisionCount(
                                                                user.getId(),
                                                                progress.getProblem().getId())))
                                .toList();

                return ResponseEntity.ok(response);
        }

        @GetMapping("/category/{category}")
        public ResponseEntity<List<ProblemProgressResponse>> getProblemsByCategory(
                        @PathVariable String category,
                        Authentication authentication) {

                String email = authentication.getName();

                User user = userRepository.findByEmail(email)
                                .orElseThrow(() -> new RuntimeException("User not found"));

                List<ProblemProgressResponse> problems = userProgressService.getProblemsByCategory(
                                user.getId(),
                                category);

                return ResponseEntity.ok(problems);
        }

        @GetMapping("/stats")
        public ResponseEntity<ProgressStatsResponse> getProgressStats(
                        Authentication authentication) {

                String email = authentication.getName();

                User user = userRepository.findByEmail(email)
                                .orElseThrow(() -> new RuntimeException("User not found"));

                ProgressStatsResponse stats = userProgressService.getProgressStats(user.getId());

                return ResponseEntity.ok(stats);
        }

        @PostMapping("/{problemId}/solve")
        public ResponseEntity<ProgressResponse> markAsSolved(
                        @PathVariable Long problemId,
                        Authentication authentication) {

                String email = authentication.getName();

                User user = userRepository.findByEmail(email)
                                .orElseThrow(() -> new RuntimeException("User not found"));

                UserProgress progress = userProgressService.markProblemAsSolved(
                                user.getId(),
                                problemId);

                ProgressResponse response = new ProgressResponse(
                                progress.getProblem().getId(),
                                progress.getProblem().getTitle(),
                                progress.isSolved(),
                                progress.getSolvedAt(),
                                userProgressService.getRevisionCount(
                                                user.getId(),
                                                progress.getProblem().getId()));

                return ResponseEntity.ok(response);
        }

        @PostMapping("/{problemId}/revise")
        public ResponseEntity<RevisionResponse> markAsRevised(
                        @PathVariable Long problemId,
                        Authentication authentication) {

                String email = authentication.getName();

                User user = userRepository.findByEmail(email)
                                .orElseThrow(() -> new RuntimeException("User not found"));

                RevisionHistory revision = userProgressService.markProblemAsRevised(
                                user.getId(),
                                problemId);

                RevisionResponse response = new RevisionResponse(
                                revision.getRevisionNumber(),
                                revision.getRevisedAt());

                return ResponseEntity.ok(response);
        }

        @GetMapping("/{problemId}/revisions")
        public ResponseEntity<List<RevisionHistoryResponse>> getRevisionHistory(
                        @PathVariable Long problemId,
                        Authentication authentication) {

                String email = authentication.getName();

                User user = userRepository.findByEmail(email)
                                .orElseThrow(() -> new RuntimeException("User not found"));

                List<RevisionHistory> revisions = userProgressService.getRevisionHistory(
                                user.getId(),
                                problemId);

                List<RevisionHistoryResponse> response = revisions.stream()
                                .map(revision -> new RevisionHistoryResponse(
                                                revision.getRevisionNumber(),
                                                revision.getRevisedAt()))
                                .toList();

                return ResponseEntity.ok(response);
        }

        @GetMapping("/solved-count")
        public ResponseEntity<Long> getSolvedCount(
                        Authentication authentication) {

                String email = authentication.getName();

                User user = userRepository.findByEmail(email)
                                .orElseThrow(() -> new RuntimeException("User not found"));

                long count = userProgressService.getSolvedCount(user.getId());

                return ResponseEntity.ok(count);
        }

        @GetMapping("/category-stats")
        public ResponseEntity<List<CategoryStatsResponse>> getCategoryStats(
                        Authentication authentication) {

                String email = authentication.getName();

                User user = userRepository.findByEmail(email)
                                .orElseThrow(() -> new RuntimeException("User not found"));

                List<CategoryStatsResponse> stats = userProgressService.getCategoryStats(user.getId());

                return ResponseEntity.ok(stats);
        }
}