package com.learndock.learndock.domain.repositories;

import com.learndock.learndock.domain.models.content.QuestionSet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionSetRepository extends JpaRepository<QuestionSet, Long> {
    List<QuestionSet> findByCatalog_Id(Long catalogId);
}
