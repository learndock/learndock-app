package com.learndock.learndock.service.content;

import com.learndock.learndock.domain.models.content.Competence;
import com.learndock.learndock.domain.models.content.Topic;
import com.learndock.learndock.domain.repositories.CompetenceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CompetenceService {
    private final CompetenceRepository competenceRepository;
    private final TopicService topicService;

    public Optional<Competence> getById(Long id) {
        return competenceRepository.findById(id);
    }

    public List<Topic> getTopics(Competence competence) {
        return competence.getTopics();
    }

    public Competence create(Competence newCompetence) {
        Competence competence = new Competence();

        competence.setTitle(newCompetence.getTitle());
        competence.setDescription(newCompetence.getDescription());
        competence.setCreatedAt(new Date());
        competence.setUpdatedAt(new Date());
        competence.setTopics(newCompetence.getTopics());

        return competenceRepository.save(competence);
    }

    public Optional<Competence> update(Long id, Competence newCompetence) {
        return competenceRepository.findById(id).map(existing -> {
            existing.setTitle(newCompetence.getTitle());
            existing.setDescription(newCompetence.getDescription());
            existing.setUpdatedAt(new Date());
            return competenceRepository.save(existing);
        });
    }

    public void linkTopic(Long competenceId, Long topicId) {
        Topic topic = topicService.getById(topicId)
                .orElseThrow(() -> new IllegalArgumentException("Topic with ID " + topicId + " does not exist."));

        competenceRepository.findById(competenceId).ifPresentOrElse(competence -> {
            if (!competence.getTopics().contains(topic)) {
                competence.getTopics().add(topic);
                competence.setUpdatedAt(new Date());
                competenceRepository.save(competence);
            }
        }, () -> {
            throw new IllegalArgumentException("Competence with ID " + competenceId + " does not exist.");
        });
    }

    public void unlinkTopic(Long competenceId, Long topicId) {
        Topic topic = topicService.getById(topicId)
                .orElseThrow(() -> new IllegalArgumentException("Topic with ID " + topicId + " does not exist."));

        competenceRepository.findById(competenceId).ifPresentOrElse(competence -> {
            if (competence.getTopics().contains(topic)) {
                competence.getTopics().remove(topic);
                competence.setUpdatedAt(new Date());
                competenceRepository.save(competence);
            }
        }, () -> {
            throw new IllegalArgumentException("Competence with ID " + competenceId + " does not exist.");
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
