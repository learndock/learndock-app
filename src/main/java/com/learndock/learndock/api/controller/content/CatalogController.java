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
    public ResponseEntity<Catalog> getById(@PathVariable Long id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
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
    @PatchMapping("/{id}")
    public ResponseEntity<Catalog> update(@PathVariable Long id, @RequestBody Catalog catalog) {
        return service.update(id, catalog)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}