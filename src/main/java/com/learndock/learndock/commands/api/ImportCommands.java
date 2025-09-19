package com.learndock.learndock.commands.api;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.learndock.learndock.domain.models.content.*;
import com.learndock.learndock.domain.models.users.UserRole;
import com.learndock.learndock.service.auth.AuthService;
import com.learndock.learndock.service.content.CatalogService;
import com.learndock.learndock.service.content.CompetenceService;
import com.learndock.learndock.service.content.QuestionSetService;
import com.learndock.learndock.service.content.TopicService;
import com.learndock.learndock.service.users.UserRoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.shell.standard.ShellComponent;
import org.springframework.shell.standard.ShellMethod;
import org.springframework.shell.standard.ShellOption;
import org.springframework.transaction.annotation.Transactional;

import java.io.InputStream;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@ShellComponent
public class ImportCommands {

    private final ObjectMapper objectMapper = new ObjectMapper();

    private final AuthService authService;
    private final UserRoleService userRoleService;

    private final CatalogService catalogService;
    private final QuestionSetService questionSetService;
    private final TopicService topicService;
    private final CompetenceService competenceService;

    @ShellMethod(key = "import-dev", value = "Set everything up")
    @Transactional
    public String importDev(@ShellOption(defaultValue = "Admin") String accountName, @ShellOption(defaultValue = "admin") String password) {
        authService.registerUser(accountName, password);
        for (UserRole role : UserRole.values()) {
            userRoleService.addRole(accountName, role);
        }

        importCatalogs();
        importCatalogData("dev/catalog_it_berufe.json", 1L);
        importCatalogData("dev/catalog_fiae.json", 2L);
        importCatalogData("dev/catalog_wiso.json", 4L);

        return "Everything was imported is ready to use! :)";
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

    @ShellMethod("Import catalog data from JSON file.")
    @Transactional
    public String importCatalogData(String filePath, Long catalogId) {
        try {
            Optional<Catalog> catalogOpt = catalogService.getById(catalogId);

            if (catalogOpt.isEmpty()) {
                return "Catalog with ID " + catalogId + " not found.";
            }

            Catalog catalog = catalogOpt.get();

            InputStream is = new ClassPathResource(filePath).getInputStream();
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(is);

            for (JsonNode setNode : root) {
                Optional<QuestionSet> qsOptional = questionSetService.create(
                        catalog.getId(),
                        setNode.path("title").asText(),
                        setNode.path("locationInRegulation").asText(),
                        mapper.convertValue(setNode.path("relatedLearningFields"), List.class)
                );
                if (qsOptional.isEmpty()) return "QuestionSet could not be created...";
                QuestionSet questionSet = qsOptional.get();

                for (JsonNode exNode : setNode.path("examples")) {
                    QuestionSetExample example = new QuestionSetExample();
                    example.setDescription(exNode.path("text").asText());
                    example.setType(exNode.path("type").asText());
                    questionSetService.addExample(questionSet.getId(), example);
                }

                for (JsonNode topicNode : setNode.path("topics")) {
                    Optional<Topic> topicOptional = topicService.create(
                            questionSet.getId(),
                            topicNode.path("title").asText()
                    );
                    if (topicOptional.isEmpty()) return "Topic could not be created...";
                    Topic topic = topicOptional.get();

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
