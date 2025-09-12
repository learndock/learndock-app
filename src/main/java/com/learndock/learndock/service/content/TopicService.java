package com.learndock.learndock.service.content;

import com.learndock.learndock.domain.models.content.Topic;
import com.learndock.learndock.domain.repositories.TopicRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TopicService {

    private final TopicRepository topicRepository;

    public List<Topic> getByQuestionSetId(Long catalogId) {
        return topicRepository.findByQuestionSetId(catalogId);
    }

    public Optional<Topic> getById(Long id) {
        return topicRepository.findById(id);
    }

    public Topic create(Topic Topic) {
        return topicRepository.save(Topic);
    }

    public Optional<Topic> updateTitle(Long id, String newTitle) {
        return topicRepository.findById(id).map(existing -> {
            existing.setTitle(newTitle);
            return topicRepository.save(existing);
        });
    }

    public boolean delete(Long id) {
        if (topicRepository.existsById(id)) {
            topicRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
