package com.learndock.learndock.api.controller.data;

import com.learndock.learndock.core.annotations.Authenticated;
import com.learndock.learndock.domain.models.data.UserCompetenceAssessment;
import com.learndock.learndock.domain.models.users.User;
import com.learndock.learndock.service.data.UserCompetenceAssessmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/assessments")
@RequiredArgsConstructor
public class UserCompetenceAssessmentController {

    private final UserCompetenceAssessmentService assessmentService;

    @Authenticated
    @GetMapping("/competence/{competenceId}")
    public ResponseEntity<?> getAssessments(User user, @PathVariable Long competenceId) {
        try {
            List<UserCompetenceAssessment> assessments =
                    assessmentService.getAssessmentsForUserAndCompetenceId(user, competenceId);
            Collections.reverse(assessments);
            return ResponseEntity.ok(assessments);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @Authenticated
    @GetMapping("/competence/{competenceId}/latest")
    public ResponseEntity<?> getLatestAssessment(User user, @PathVariable Long competenceId) {
        try {
            UserCompetenceAssessment latest =
                    assessmentService.getLatestAssessment(user, competenceId);
            if (latest == null) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(latest);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @Authenticated
    @PostMapping("/competence/{competenceId}")
    public ResponseEntity<?> addAssessment(User user,
                                           @PathVariable Long competenceId,
                                           @RequestParam int assessmentValue) {
        try {
            UserCompetenceAssessment saved =
                    assessmentService.addAssessment(user, competenceId, assessmentValue);
            return ResponseEntity.status(HttpStatus.CREATED).body(saved);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @Authenticated
    @GetMapping("/self-assessment-rate")
    public double getSelfAssessmentRate(User user) {
        return BigDecimal.valueOf(assessmentService.getSelfAssessmentRate(user))
                .setScale(2, RoundingMode.HALF_UP)
                .doubleValue();
    }

}
