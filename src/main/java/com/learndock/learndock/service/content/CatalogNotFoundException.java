package com.learndock.learndock.service.content;

public class CatalogNotFoundException extends RuntimeException {
    public CatalogNotFoundException(Long id) {
        super("Catalog with id " + id + " not found");
    }
}