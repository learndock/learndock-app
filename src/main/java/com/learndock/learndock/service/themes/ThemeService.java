package com.learndock.learndock.service.themes;

import com.learndock.learndock.api.dto.themes.Theme;
import com.learndock.learndock.api.dto.themes.ThemeInfo;
import com.learndock.learndock.api.dto.themes.ThemeSource;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.nio.file.Path;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ThemeService {

    private final ThemeFileIndex index;
    private final ThemeCache cache;
    private final ThemeSourceResolver sourceResolver;

    public Set<String> getAvailableThemeIdentifiers() {
        return index.getIdentifiers();
    }

    public Set<ThemeInfo> getAvailableThemeInfos() {
        return index.getIdentifiers().stream()
                .map(this::getTheme)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .map(theme -> {
                    ThemeInfo info = new ThemeInfo();
                    info.setIdentifier(theme.getIdentifier());
                    info.setName(theme.getName());
                    info.setDescription(theme.getDescription());
                    return info;
                })
                .collect(Collectors.toSet());
    }

    public Optional<Theme> getTheme(String id) {
        return cache.get(id);
    }

    public ThemeSource getThemeSource(String id) {
        Path path = index.getPath(id);
        return (path != null) ? sourceResolver.resolve(id, path) : null;
    }

    public void reload() {
        index.reload();
        cache.clear();
    }
}
