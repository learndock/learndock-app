package com.learndock.learndock.service.data;

import com.learndock.learndock.domain.models.content.Competence;
import com.learndock.learndock.domain.models.data.UserCompetenceAssessment;
import com.learndock.learndock.domain.models.users.User;
import com.learndock.learndock.domain.repositories.UserCompetenceAssessmentRepository;
import com.learndock.learndock.service.content.CompetenceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserCompetenceAssessmentService {

    private final UserCompetenceAssessmentRepository assessmentRepository;
    private final CompetenceService competenceService;

    public UserCompetenceAssessment getLatestAssessment(User user, Long competenceId) {
        Competence competence = competenceService.getById(competenceId)
                .orElseThrow(() -> new IllegalArgumentException("Competence not found with id: " + competenceId));

        return assessmentRepository.findTopByUserAndCompetenceOrderByAssessmentDateDesc(user, competence);
    }

    public List<UserCompetenceAssessment> getAssessmentsForUserAndCompetenceId(User user, Long competenceId) {
        Competence competence = competenceService.getById(competenceId)
                .orElseThrow(() -> new IllegalArgumentException("Competence not found with id: " + competenceId));

        return assessmentRepository.findByUserAndCompetence(user, competence);
    }

    public UserCompetenceAssessment addAssessment(User user, Long competenceId, int value) {
        Competence competence = competenceService.getById(competenceId)
                .orElseThrow(() -> new IllegalArgumentException("Competence not found with id: " + competenceId));

        UserCompetenceAssessment assessment = new UserCompetenceAssessment();
        assessment.setUser(user);
        assessment.setCompetence(competence);
        assessment.setAssessmentValue(value);
        assessment.setAssessmentDate(new Date());
        return assessmentRepository.save(assessment);
    }

    public double getSelfAssessmentRate(User user) {
        long totalCompetences = competenceService.countAll();
        if (totalCompetences == 0) return 0.0;
        long assessedCompetences = assessmentRepository.countDistinctCompetenceByUser(user);
        return (assessedCompetences * 100.0) / totalCompetences;
    }
}
