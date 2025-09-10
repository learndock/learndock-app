package com.learndock.learndock.commands.api;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.learndock.learndock.domain.models.content.Catalog;
import com.learndock.learndock.domain.models.content.QuestionSet;
import com.learndock.learndock.domain.models.content.QuestionSetExample;
import com.learndock.learndock.service.content.CatalogNotFoundException;
import com.learndock.learndock.service.content.CatalogService;
import com.learndock.learndock.service.content.QuestionSetService;
import lombok.RequiredArgsConstructor;
import org.springframework.shell.standard.ShellComponent;
import org.springframework.shell.standard.ShellMethod;

import java.io.InputStream;
import java.util.List;

@ShellComponent
@RequiredArgsConstructor
public class ContentCommands {

    private final ObjectMapper objectMapper = new ObjectMapper();

    private final CatalogService catalogService;
    private final QuestionSetService questionSetService;

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