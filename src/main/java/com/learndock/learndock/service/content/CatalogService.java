package com.learndock.learndock.service.content;

import com.learndock.learndock.domain.models.content.Catalog;
import com.learndock.learndock.domain.repositories.CatalogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CatalogService {

    private final CatalogRepository repository;

    public List<Catalog> getAll() {
        return repository.findAll();
    }

    public Catalog getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new CatalogNotFoundException(id));
    }

    public Catalog add(Catalog catalog) {
        catalog.setCreatedAt(new Date());
        catalog.setUpdatedAt(new Date());
        return repository.save(catalog);
    }

    public void remove(Long id) {
        if (!repository.existsById(id)) {
            throw new CatalogNotFoundException(id);
        }
        repository.deleteById(id);
    }

    public Catalog updateTitle(Long id, String title) {
        Catalog catalog = getById(id);
        catalog.setTitle(title);
        catalog.setUpdatedAt(new Date());
        return repository.save(catalog);
    }

    public Catalog updateDescription(Long id, String description) {
        Catalog catalog = getById(id);
        catalog.setDescription(description);
        catalog.setUpdatedAt(new Date());
        return repository.save(catalog);
    }
}