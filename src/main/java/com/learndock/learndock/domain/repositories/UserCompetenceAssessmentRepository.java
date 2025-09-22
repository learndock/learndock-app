package com.learndock.learndock.domain.repositories;

import com.learndock.learndock.domain.models.content.Competence;
import com.learndock.learndock.domain.models.data.UserCompetenceAssessment;
import com.learndock.learndock.domain.models.users.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserCompetenceAssessmentRepository extends JpaRepository<UserCompetenceAssessment, Long> {

    List<UserCompetenceAssessment> findByUserAndCompetence(User user, Competence competence);

    UserCompetenceAssessment findTopByUserAndCompetenceOrderByAssessmentDateDesc(User user, Competence competence);

    long countDistinctCompetenceByUser(User user);
}
