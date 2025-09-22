package com.learndock.learndock.domain.repositories;

import com.learndock.learndock.domain.models.content.Competence;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompetenceRepository extends JpaRepository<Competence, Long> {
    Page<Competence> findByTitleContainingIgnoreCase(String title, Pageable pageable);
}