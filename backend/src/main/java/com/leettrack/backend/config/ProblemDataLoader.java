package com.leettrack.backend.config;

import com.leettrack.backend.entity.Difficulty;
import com.leettrack.backend.entity.Problem;
import com.leettrack.backend.repository.ProblemRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

@Configuration
public class ProblemDataLoader {

    @Bean
    CommandLineRunner loadProblems(ProblemRepository problemRepository) {

        return args -> {

            // Don't insert the CSV data if problems already exist
            if (problemRepository.count() > 0) {
                return;
            }

            InputStream inputStream = getClass()
                    .getClassLoader()
                    .getResourceAsStream(
                            "data/leetcode_problems.csv");

            if (inputStream == null) {
                throw new RuntimeException(
                        "leetcode_problems.csv not found");
            }

            try (BufferedReader reader = new BufferedReader(
                    new InputStreamReader(
                            inputStream,
                            StandardCharsets.UTF_8))) {

                // Skip CSV header
                reader.readLine();

                String line;

                while ((line = reader.readLine()) != null) {

                    String[] data = line.split(
                            ",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)");

                    Problem problem = new Problem();

                    problem.setOrderIndex(
                            Integer.parseInt(data[0]));

                    problem.setTitle(data[1]);
                    problem.setSlug(data[2]);

                    problem.setDifficulty(
                            Difficulty.valueOf(
                                    data[3].toUpperCase()));

                    problem.setCategory(data[4]);
                    problem.setLeetcodeUrl(data[5]);

                    problemRepository.save(problem);
                }
            }
        };
    }
}