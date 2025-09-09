package com.learndock.learndock.core.configurations;

public interface ConfigEntryAccessor<T> {
    T get();

    Class<T> getType();

    T getDefaultValue();

    String getDescription();
}