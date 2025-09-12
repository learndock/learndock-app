package com.learndock.learndock.domain.repositories;

import com.learndock.learndock.domain.models.content.Topic;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TopicRepository extends JpaRepository<Topic, Long> {
    List<Topic> findByQuestionSetId(Long questionSetId);
}
