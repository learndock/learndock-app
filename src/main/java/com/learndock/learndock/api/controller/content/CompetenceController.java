package com.learndock.learndock.api.controller.content;

import com.learndock.learndock.core.annotations.Roles;
import com.learndock.learndock.domain.models.content.Competence;
import com.learndock.learndock.domain.models.users.UserRole;
import com.learndock.learndock.service.content.CompetenceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @Roles(UserRole.MANAGE_COMPETENCES)
    @PostMapping
    public Competence create(@RequestBody Competence competence) {
        return competenceService.create(competence);
    }

    @Roles(UserRole.MANAGE_COMPETENCES)
    @PutMapping("/{id}")
    public ResponseEntity<Competence> updateTitle(@PathVariable Long id, @RequestBody String title) {
        return competenceService.updateTitle(id, title)
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
