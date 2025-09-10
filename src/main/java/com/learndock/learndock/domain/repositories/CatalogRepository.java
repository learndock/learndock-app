package com.learndock.learndock.domain.repositories;

import com.learndock.learndock.domain.models.content.Catalog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CatalogRepository extends JpaRepository<Catalog, Long> {
}
