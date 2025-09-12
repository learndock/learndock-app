package com.learndock.learndock.commands.api;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.learndock.learndock.domain.models.content.*;
import com.learndock.learndock.service.content.CatalogService;
import com.learndock.learndock.service.content.CompetenceService;
import com.learndock.learndock.service.content.QuestionSetService;
import com.learndock.learndock.service.content.TopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.shell.standard.ShellComponent;
import org.springframework.shell.standard.ShellMethod;
import org.springframework.transaction.annotation.Transactional;

import java.io.InputStream;
import java.util.Collections;
import java.util.Date;
import java.util.List;

@ShellComponent
public class ImportCommands {

    @Autowired
    private CatalogService catalogService;
    @Autowired
    private QuestionSetService questionSetService;
    @Autowired
    private TopicService topicService;
    @Autowired
    private CompetenceService competenceService;

    @ShellMethod("Import catalog data from JSON file.")
    @Transactional
    public String importCatalogData(String filePath, Long catalogId) {
        try {
            Catalog catalog = catalogService.getById(catalogId);

            InputStream is = new ClassPathResource(filePath).getInputStream();
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(is);

            long questionSetNumber = 1;
            for (JsonNode setNode : root) {
                QuestionSet questionSet = new QuestionSet();
                questionSet.setNumber(questionSetNumber++);
                questionSet.setTitle(setNode.path("title").asText());
                questionSet.setRelatedLearningFields(mapper.convertValue(setNode.path("relatedLearningFields"), List.class));
                questionSet.setLocationInRegulation(setNode.path("locationInRegulation").asText());
                questionSet.setCatalog(catalog);

                questionSet = questionSetService.create(questionSet);

                for (JsonNode exNode : setNode.path("examples")) {
                    QuestionSetExample example = new QuestionSetExample();
                    example.setDescription(exNode.path("text").asText());
                    example.setType(exNode.path("type").asText());
                    questionSetService.addExample(questionSet.getId(), example);
                }

                for (JsonNode topicNode : setNode.path("topics")) {
                    Topic topic = new Topic();
                    topic.setTitle(topicNode.path("title").asText());
                    topic.setQuestionSet(questionSet);
                    topic = topicService.create(topic);

                    for (JsonNode compNode : topicNode.path("competences")) {
                        Competence competence = new Competence();
                        competence.setTitle(compNode.path("title").asText());
                        competence.setDescription(compNode.path("description").asText());
                        competence.setCreatedAt(new Date());
                        competence.setUpdatedAt(new Date());
                        competence.setTopics(Collections.singletonList(topic));
                        competenceService.create(competence);
                    }
                }
            }
            return "Catalog data imported successfully.";
        } catch (Exception e) {
            return "Error importing catalog data: " + e.getMessage();
        }
    }
}
