package com.learndock.learndock.domain.repositories;

import com.learndock.learndock.domain.models.content.Competence;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompetenceRepository extends JpaRepository<Competence, Long> {
}