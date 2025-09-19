package com.learndock.learndock.service.content;

import com.learndock.learndock.domain.models.content.Catalog;
import com.learndock.learndock.domain.repositories.CatalogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class CatalogService {

    private final CatalogRepository repository;

    public List<Catalog> getAll() {
        return repository.findAll();
    }

    public Optional<Catalog> getById(Long id) {
        return repository.findById(id);
    }

    public Catalog add(Catalog catalog) {
        catalog.setCreatedAt(new Date());
        catalog.setUpdatedAt(new Date());
        return repository.save(catalog);
    }

    public void remove(Long id) {
        Catalog catalog = repository.findById(id)
                .orElseThrow(() -> new CatalogNotFoundException(id));
        repository.delete(catalog);
    }

    public Optional<Catalog> update(Long id, Catalog newCatalog) {
        return repository.findById(id).map(existing -> {
            existing.setTitle(newCatalog.getTitle());
            existing.setDescription(newCatalog.getDescription());
            existing.setUpdatedAt(new Date());
            return repository.save(existing);
        });
    }
}