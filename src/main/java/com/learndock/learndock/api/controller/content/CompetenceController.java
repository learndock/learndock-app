package com.learndock.learndock.api.controller.content;

import com.learndock.learndock.core.annotations.Roles;
import com.learndock.learndock.domain.models.content.Competence;
import com.learndock.learndock.domain.models.content.Topic;
import com.learndock.learndock.domain.models.users.UserRole;
import com.learndock.learndock.service.content.CompetenceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/competences")
@RequiredArgsConstructor
public class CompetenceController {

    private final CompetenceService competenceService;

    @GetMapping("/{id}")
    public ResponseEntity<Competence> getById(@PathVariable Long id) {
        return competenceService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/topics")
    public ResponseEntity<List<Topic>> getTopicsForId(@PathVariable Long id) {
        return competenceService.getById(id)
                .map(Competence::getTopics)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Roles(UserRole.MANAGE_COMPETENCES)
    @PostMapping("/{competenceId}/linkTopic/{topicId}")
    public ResponseEntity<Void> linkTopic(
            @PathVariable Long competenceId,
            @PathVariable Long topicId) {
        try {
            competenceService.linkTopic(competenceId, topicId);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @Roles(UserRole.MANAGE_COMPETENCES)
    @PostMapping("/{competenceId}/unlinkTopic/{topicId}")
    public ResponseEntity<Void> unlinkTopic(
            @PathVariable Long competenceId,
            @PathVariable Long topicId) {
        try {
            competenceService.unlinkTopic(competenceId, topicId);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @Roles(UserRole.MANAGE_COMPETENCES)
    @PostMapping
    public Competence create(@RequestBody Competence competence) {
        return competenceService.create(competence);
    }

    @Roles(UserRole.MANAGE_COMPETENCES)
    @PatchMapping("/{id}")
    public ResponseEntity<Competence> update(@PathVariable Long id, @RequestBody Competence competence) {
        return competenceService.update(id, competence)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Roles(UserRole.MANAGE_COMPETENCES)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (competenceService.delete(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
