package com.learndock.learndock.commands.api;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.learndock.learndock.domain.models.content.*;
import com.learndock.learndock.service.content.*;
import lombok.RequiredArgsConstructor;
import org.springframework.shell.standard.ShellComponent;
import org.springframework.shell.standard.ShellMethod;

import java.io.InputStream;
import java.util.List;
import java.util.Map;

@ShellComponent
@RequiredArgsConstructor
public class ContentCommands {

    private final ObjectMapper objectMapper = new ObjectMapper();

    private final CatalogService catalogService;
    private final QuestionSetService questionSetService;
    private final TopicService topicService;
    private final CompetenceService competenceService;

    @ShellMethod(key = "import-all", value = "Import catalogs, question sets, topics and competences")
    public String importAll() {
        importCatalogs();
        importQuestionSets();
        importTopics();
        importCompetences();
        return "Import completed.";
    }

    @ShellMethod(key = "import-catalogs", value = "Import default catalogs from JSON file")
    public String importCatalogs() {
        try (InputStream is = getClass().getResourceAsStream("/dev/catalogs.json")) {
            List<Catalog> catalogs = objectMapper.readValue(is, new TypeReference<>() {
            });
            catalogs.forEach(catalogService::add);
            return "Imported " + catalogs.size() + " catalogs.";
        } catch (Exception e) {
            return "Error importing catalogs: " + e.getMessage();
        }
    }

    @ShellMethod(key = "import-question-sets", value = "Import question sets from JSON file and assign to catalogs")
    public String importQuestionSets() {
        try (InputStream is = getClass().getResourceAsStream("/dev/question-sets.json")) {
            List<QuestionSetImportDto> dtos = objectMapper.readValue(is, new TypeReference<>() {
            });
            int imported = 0;
            for (QuestionSetImportDto dto : dtos) {
                Catalog catalog;
                try {
                    catalog = catalogService.getById(dto.catalogId());
                } catch (CatalogNotFoundException e) {
                    throw new RuntimeException("Catalog not found: " + dto.catalogId());
                }

                QuestionSet qs = new QuestionSet();
                qs.setTitle(dto.title());
                qs.setRelatedLearningFields(dto.relatedLearningFields());
                qs.setLocationInRegulation(dto.locationInRegulation());
                qs.setCatalog(catalog);
                if (dto.examples() != null) {
                    for (ExampleImportDto ex : dto.examples()) {
                        QuestionSetExample example = new QuestionSetExample();
                        example.setDescription(ex.text());
                        example.setType(ex.type());
                        example.setQuestionSet(qs);
                        qs.getExamples().add(example);
                    }
                }
                questionSetService.create(qs);
                imported++;
            }
            return "Imported " + imported + " question sets.";
        } catch (Exception e) {
            return "Error importing question sets: " + e.getMessage();
        }
    }

    @ShellMethod(key = "import-topics", value = "Import topics from JSON file")
    public String importTopics() {
        try (InputStream is = getClass().getResourceAsStream("/dev/topics.json")) {
            List<Map<String, Object>> dtos = objectMapper.readValue(is, new TypeReference<>() {
            });
            int imported = 0;
            for (Map<String, Object> dto : dtos) {
                String title = (String) dto.get("title");
                Long questionSetId = ((Number) dto.get("questionSetId")).longValue();
                var qsOpt = questionSetService.getById(questionSetId);
                if (qsOpt.isEmpty()) {
                    System.err.println("QuestionSet not found for id: " + questionSetId + ", skipping topic: " + title);
                    continue;
                }
                Topic topic = new Topic();
                topic.setTitle(title);
                topic.setQuestionSet(qsOpt.get());
                topicService.create(topic);
                imported++;
            }
            return "Imported " + imported + " topics.";
        } catch (Exception e) {
            return "Error importing topics: " + e.getMessage();
        }
    }

    @ShellMethod(key = "import-competences", value = "Import competences from JSON file")
    public String importCompetences() {
        try (InputStream is = getClass().getResourceAsStream("/dev/competences.json")) {
            List<Map<String, Object>> dtos = objectMapper.readValue(is, new TypeReference<>() {
            });
            int imported = 0;
            for (Map<String, Object> dto : dtos) {
                String title = (String) dto.get("title");
                String desc = (String) dto.get("description");
                List<Number> topicIds = (List<Number>) dto.get("topicIds");
                List<Topic> topics = new java.util.ArrayList<>();
                boolean allFound = true;
                for (Number id : topicIds) {
                    var topicOpt = topicService.getById(id.longValue());
                    if (topicOpt.isEmpty()) {
                        System.err.println("Topic not found for id: " + id + ", skipping competence: " + title);
                        allFound = false;
                        break;
                    }
                    topics.add(topicOpt.get());
                }
                if (!allFound) continue;
                Competence competence = new Competence();
                competence.setTitle(title);
                if (desc != null) {
                    competence.setDescription(desc);
                }
                competence.setTopics(topics);
                // Save competence (implement create in your service)
                competenceService.create(competence);
                imported++;
            }
            return "Imported " + imported + " competences.";
        } catch (Exception e) {
            return "Error importing competences: " + e.getMessage();
        }
    }


    private record ExampleImportDto(String text, String type) {
    }

    private record QuestionSetImportDto(
            String title,
            List<String> relatedLearningFields,
            String locationInRegulation,
            Long catalogId,
            List<ExampleImportDto> examples
    ) {
    }
}