package com.learndock.learndock.core.configurations.handlers;

public interface ConfigHandler {
    void loadConfig(Class<?> configClass);

    String getFileExtension(); // for future registration/use
}
