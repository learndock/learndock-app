package com.learndock.learndock.service.content;

import com.learndock.learndock.domain.models.content.Catalog;
import com.learndock.learndock.domain.models.content.QuestionSet;
import com.learndock.learndock.domain.models.content.QuestionSetExample;
import com.learndock.learndock.domain.repositories.QuestionSetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class QuestionSetService {

    private final QuestionSetRepository questionSetRepository;
    private final CatalogService catalogService;

    public List<QuestionSet> getByCatalogId(Long catalogId) {
        return questionSetRepository.findByCatalog_Id(catalogId);
    }

    public Optional<QuestionSet> getById(Long id) {
        return questionSetRepository.findById(id);
    }

    public Optional<QuestionSet> create(
            Long catalogId,
            String title,
            String locationInRegulation,
            List<String> relatedLearningFields
    ) {
        Optional<Catalog> catalogOpt = catalogService.getById(catalogId);
        if (catalogOpt.isEmpty()) return Optional.empty();
        Catalog catalog = catalogOpt.get();

        QuestionSet newSet = new QuestionSet();
        newSet.setTitle(title);
        newSet.setLocationInRegulation(locationInRegulation);
        newSet.setRelatedLearningFields(relatedLearningFields);
        newSet.setCatalog(catalog);

        questionSetRepository.save(newSet);

        return Optional.of(newSet);
    }

    public Optional<QuestionSet> update(Long id, QuestionSet questionSet) {
        return questionSetRepository.findById(id).map(existing -> {
            existing.setTitle(questionSet.getTitle());
            existing.setRelatedLearningFields(questionSet.getRelatedLearningFields());
            existing.setLocationInRegulation(questionSet.getLocationInRegulation());
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

    @Transactional
    public boolean delete(Long id) {
        Optional<QuestionSet> qsOpt = questionSetRepository.findById(id);
        if (qsOpt.isEmpty()) return false;
        QuestionSet qs = qsOpt.get();
        questionSetRepository.delete(qs);
        return true;
    }

}
