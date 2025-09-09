package com.learndock.learndock.service.themes;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.learndock.learndock.api.dto.themes.Theme;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;

@Component
public class ThemeLoader {
    private final ObjectMapper objectMapper = new ObjectMapper();

    public Theme load(Path path) throws IOException {
        return objectMapper.readValue(Files.newBufferedReader(path), Theme.class);
    }

    public Theme load(InputStream stream) throws IOException {
        return objectMapper.readValue(stream, Theme.class);
    }
}
