package com.learndock.learndock.service.content;

import com.learndock.learndock.domain.models.content.QuestionSet;
import com.learndock.learndock.domain.models.content.QuestionSetExample;
import com.learndock.learndock.domain.repositories.QuestionSetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class QuestionSetService {

    private final QuestionSetRepository questionSetRepository;

    public List<QuestionSet> getByCatalogId(Long catalogId) {
        return questionSetRepository.findByCatalog_Id(catalogId);
    }

    public Optional<QuestionSet> getById(Long id) {
        return questionSetRepository.findById(id);
    }

    public QuestionSet create(QuestionSet questionSet) {
        return questionSetRepository.save(questionSet);
    }

    public Optional<QuestionSet> update(Long id, QuestionSet updated) {
        return questionSetRepository.findById(id).map(existing -> {
            existing.setTitle(updated.getTitle());
            existing.setRelatedLearningFields(updated.getRelatedLearningFields());
            existing.setLocationInRegulation(updated.getLocationInRegulation());
            existing.setCatalog(updated.getCatalog());
            return questionSetRepository.save(existing);
        });
    }

    public QuestionSetExample addExample(Long questionSetId, QuestionSetExample example) {
        QuestionSet questionSet = questionSetRepository.findById(questionSetId)
                .orElseThrow(() -> new RuntimeException("QuestionSet not found"));
        example.setQuestionSet(questionSet);
        questionSet.getExamples().add(example);
        questionSetRepository.save(questionSet);
        return example;
    }

    public boolean delete(Long id) {
        if (questionSetRepository.existsById(id)) {
            questionSetRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
