package com.leettrack.backend.config;

import com.leettrack.backend.entity.Difficulty;
import com.leettrack.backend.entity.Problem;
import com.leettrack.backend.repository.ProblemRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ProblemDataSeeder {

    @Bean
    CommandLineRunner seedProblems(ProblemRepository problemRepository) {

        return args -> {

            if (problemRepository.count() > 0) {
                return;
            }

            Problem twoSum = new Problem();
            twoSum.setTitle("Two Sum");
            twoSum.setSlug("two-sum");
            twoSum.setDifficulty(Difficulty.EASY);
            twoSum.setCategory("ARRAY");
            twoSum.setLeetcodeUrl("https://leetcode.com/problems/two-sum/");
            twoSum.setOrderIndex(1);

            problemRepository.save(twoSum);

            Problem validAnagram = new Problem();
            validAnagram.setTitle("Valid Anagram");
            validAnagram.setSlug("valid-anagram");
            validAnagram.setDifficulty(Difficulty.EASY);
            validAnagram.setCategory("HASHING");
            validAnagram.setLeetcodeUrl("https://leetcode.com/problems/valid-anagram/");
            validAnagram.setOrderIndex(2);

            problemRepository.save(validAnagram);

            Problem longestSubstring = new Problem();
            longestSubstring.setTitle("Longest Substring Without Repeating Characters");
            longestSubstring.setSlug("longest-substring-without-repeating-characters");
            longestSubstring.setDifficulty(Difficulty.MEDIUM);
            longestSubstring.setCategory("SLIDING_WINDOW");
            longestSubstring.setLeetcodeUrl(
                    "https://leetcode.com/problems/longest-substring-without-repeating-characters/");
            longestSubstring.setOrderIndex(3);

            problemRepository.save(longestSubstring);

            System.out.println("Sample problems seeded successfully.");
        };
    }
}