package com.learndock.learndock.service.content;

import com.learndock.learndock.domain.models.content.QuestionSet;
import com.learndock.learndock.domain.models.content.Topic;
import com.learndock.learndock.domain.repositories.TopicRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TopicService {

    private final TopicRepository topicRepository;
    private final QuestionSetService questionSetService;

    public List<Topic> getByQuestionSetId(Long catalogId) {
        return topicRepository.findByQuestionSetId(catalogId);
    }

    public Optional<Topic> getById(Long id) {
        return topicRepository.findById(id);
    }

    public Optional<Topic> create(Long questionSetId, String title) {
        Optional<QuestionSet> qsOpt = questionSetService.getById(questionSetId);
        if (qsOpt.isEmpty()) return Optional.empty();
        QuestionSet questionSet = qsOpt.get();

        Topic newTopic = new Topic();
        newTopic.setTitle(title);
        newTopic.setQuestionSet(questionSet);

        topicRepository.save(newTopic);

        return Optional.of(newTopic);
    }

    public Optional<Topic> update(Long id, Topic newTopic) {
        return topicRepository.findById(id).map(existing -> {
            existing.setTitle(newTopic.getTitle());
            return topicRepository.save(existing);
        });
    }


    public List<Topic> searchByCatalog(Long catalogId, String query) {
        return topicRepository.findByQuestionSet_Catalog_IdAndTitleContainingIgnoreCase(catalogId, query);
    }

    public List<Topic> search(String query, int limit) {
        return topicRepository.findByTitleContainingIgnoreCase(query, PageRequest.of(0, limit)).getContent();
    }

    public boolean delete(Long id) {
        if (topicRepository.existsById(id)) {
            topicRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
