package com.learndock.learndock.service.content;

import com.learndock.learndock.domain.models.content.Competence;
import com.learndock.learndock.domain.models.content.Topic;
import com.learndock.learndock.domain.repositories.CompetenceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CompetenceService {
    private final CompetenceRepository competenceRepository;
    private final TopicService topicService;

    public Optional<Competence> getById(Long id) {
        return competenceRepository.findById(id);
    }

    public Competence create(Competence Competence) {
        return competenceRepository.save(Competence);
    }

    public Optional<Competence> updateTitle(Long id, String newTitle) {
        return competenceRepository.findById(id).map(existing -> {
            existing.setTitle(newTitle);
            return competenceRepository.save(existing);
        });
    }

    public Optional<Competence> updateDescription(Long id, String newDescription) {
        return competenceRepository.findById(id).map(existing -> {
            existing.setDescription(newDescription);
            return competenceRepository.save(existing);
        });
    }

    public void linkTopic(Long competenceId, Long topicId) {
        Optional<Topic> topicOpt = topicService.getById(topicId);
        if (topicOpt.isEmpty()) {
            throw new IllegalArgumentException("Topic with ID " + topicId + " does not exist.");
        }

        competenceRepository.findById(competenceId).ifPresent(competence -> {
            competence.getTopics().add(topicOpt.get());
            competenceRepository.save(competence);
        });
    }

    public boolean delete(Long id) {
        if (competenceRepository.existsById(id)) {
            competenceRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
