package com.learndock.learndock.api.controller.content;

import com.learndock.learndock.core.annotations.Roles;
import com.learndock.learndock.domain.models.content.Catalog;
import com.learndock.learndock.domain.models.users.UserRole;
import com.learndock.learndock.service.content.CatalogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/catalogs")
@RequiredArgsConstructor
public class CatalogController {

    private final CatalogService service;

    @GetMapping
    public List<Catalog> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Catalog getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @Roles(UserRole.MANAGE_CATALOGS)
    @PostMapping
    public ResponseEntity<Catalog> add(@RequestBody Catalog catalog) {
        return ResponseEntity.ok(service.add(catalog));
    }

    @Roles(UserRole.MANAGE_CATALOGS)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remove(@PathVariable Long id) {
        service.remove(id);
        return ResponseEntity.noContent().build();
    }

    @Roles(UserRole.MANAGE_CATALOGS)
    @PatchMapping("/{id}/title")
    public ResponseEntity<Catalog> updateTitle(@PathVariable Long id, @RequestBody String title) {
        return ResponseEntity.ok(service.updateTitle(id, title));
    }

    @Roles(UserRole.MANAGE_CATALOGS)
    @PatchMapping("/{id}/description")
    public ResponseEntity<Catalog> updateDescription(@PathVariable Long id, @RequestBody String description) {
        return ResponseEntity.ok(service.updateDescription(id, description));
    }
}