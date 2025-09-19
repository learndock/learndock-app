package com.learndock.learndock.api.controller.content;

import com.learndock.learndock.api.dto.content.CreateQuestionSetRequest;
import com.learndock.learndock.core.annotations.Roles;
import com.learndock.learndock.domain.models.content.QuestionSet;
import com.learndock.learndock.domain.models.users.UserRole;
import com.learndock.learndock.service.content.QuestionSetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/question-sets")
@RequiredArgsConstructor
public class QuestionSetController {

    private final QuestionSetService questionSetService;

    @GetMapping("/catalog/{id}")
    public List<QuestionSet> getForCatalog(@PathVariable Long id) {
        return questionSetService.getByCatalogId(id);
    }

    @GetMapping("/{id}")
    public ResponseEntity<QuestionSet> getById(@PathVariable Long id) {
        return questionSetService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Roles(UserRole.MANAGE_QUESTION_SETS)
    @PostMapping
    public ResponseEntity<QuestionSet> create(@RequestBody CreateQuestionSetRequest request) {
        return questionSetService.create(
                        request.getCatalogId(),
                        request.getTitle(),
                        request.getLocationInRegulation(),
                        request.getRelatedLearningFields()
                )
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Roles(UserRole.MANAGE_QUESTION_SETS)
    @PatchMapping("/{id}")
    public ResponseEntity<QuestionSet> update(@PathVariable Long id, @RequestBody QuestionSet questionSet) {
        return questionSetService.update(id, questionSet)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Roles(UserRole.MANAGE_QUESTION_SETS)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (questionSetService.delete(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
