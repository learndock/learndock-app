package com.learndock.learndock.service.themes;

import com.learndock.learndock.api.dto.themes.Theme;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.env.Environment;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class ThemeFileIndex {
    private static final Logger LOGGER = LoggerFactory.getLogger(ThemeFileIndex.class);
    private static final String RESOURCE_THEMES_PATH = "themes";
    private static final String RUNTIME_THEMES_PATH = "./config/themes";
    private final Environment environment;
    private final ThemeLoader loader;
    private final Map<String, Path> themeFileMap = new ConcurrentHashMap<>();

    @PostConstruct
    public void init() {
        reload();
    }

    public void reload() {
        themeFileMap.clear();
        ensureUserDirectoryExists();
        try {
            loadFromResources();
            loadFromRuntime();
        } catch (IOException e) {
            LOGGER.error("Failed to load themes", e);
        }
    }

    public Set<String> getIdentifiers() {
        return Collections.unmodifiableSet(themeFileMap.keySet());
    }

    public Path getPath(String id) {
        return themeFileMap.get(id);
    }

    private void ensureUserDirectoryExists() {
        File dir = new File(RUNTIME_THEMES_PATH);
        if (!dir.exists() && dir.mkdirs()) {
            LOGGER.info("Created missing theme directory: {}", dir.getPath());
        }
    }

    private void loadFromResources() throws IOException {
        if (Arrays.asList(environment.getActiveProfiles()).contains("dev")) {
            Path devThemeDir = Paths.get("src/main/resources/themes");
            if (Files.exists(devThemeDir)) {
                try (var stream = Files.list(devThemeDir)) {
                    List<Path> jsonPaths = stream.filter(p -> p.toString().endsWith(".json")).toList();
                    LOGGER.info("(dev) Loading predefined themes from filesystem: {}", jsonPaths.stream().map(Path::getFileName).map(Path::toString).collect(Collectors.toList()));
                    for (Path path : jsonPaths) {
                        try {
                            Theme meta = loader.load(path);
                            themeFileMap.putIfAbsent(meta.getIdentifier(), path);
                        } catch (IOException e) {
                            LOGGER.warn("Failed to read dev theme from filesystem: {}", path, e);
                        }
                    }
                }
                return;
            }
        }

        // Fallback to classpath
        PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
        Resource[] resources = resolver.getResources("classpath:" + RESOURCE_THEMES_PATH + "/*.json");

        for (Resource resource : resources) {
            try (InputStream inputStream = resource.getInputStream()) {
                Theme meta = loader.load(inputStream);

                Path tempFile = Files.createTempFile("theme-", ".json");
                Files.copy(resource.getInputStream(), tempFile, StandardCopyOption.REPLACE_EXISTING);

                themeFileMap.putIfAbsent(meta.getIdentifier(), tempFile);
            } catch (IOException e) {
                LOGGER.error("Failed to load or map theme resource: {}", resource.getFilename(), e);
            }
        }

    }

    private void loadFromRuntime() throws IOException {
        File dir = new File(RUNTIME_THEMES_PATH);
        File[] files = dir.listFiles((d, name) -> name.endsWith(".json"));
        if (files == null) return;

        for (File file : files) {
            Theme theme = loader.load(file.toPath());
            themeFileMap.put(theme.getIdentifier(), file.toPath());
        }
    }
}