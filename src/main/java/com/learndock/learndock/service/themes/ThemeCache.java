package com.learndock.learndock.service.themes;

import com.learndock.learndock.api.dto.themes.Theme;
import com.learndock.learndock.sys.cache.GenericCache;
import com.learndock.learndock.sys.cache.GenericCacheManager;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.util.Optional;

import static com.learndock.learndock.config.LoggingUserConfig.LOG_THEME_CACHE_CHANGES;

@Component
@RequiredArgsConstructor
public class ThemeCache {

    private static final Logger LOGGER = LoggerFactory.getLogger(ThemeCache.class);
    private final ThemeFileIndex index;
    private final ThemeLoader loader;
    private final GenericCacheManager cacheManager;

    private GenericCache<String, Theme> cache;

    @PostConstruct
    public void init() {
        this.cache = new GenericCache<>(
                Duration.ofHours(6),
                this::loadTheme,
                (key, value) -> {
                    if (LOG_THEME_CACHE_CHANGES.get()) {
                        LOGGER.info("Theme evicted from cache: {}", key);
                    }
                }
        );
        cacheManager.register(cache);
    }

    public Optional<Theme> get(String id) {
        return cache.get(id);
    }

    public void clear() {
        cache.clear();
    }

    private Optional<Theme> loadTheme(String id) {
        var path = index.getPath(id);
        if (path == null) return Optional.empty();

        try {
            if (cache.contains(id)) {
                return cache.get(id);
            } else {
                Theme theme = loader.load(path);
                if (LOG_THEME_CACHE_CHANGES.get()) {
                    LOGGER.info("Theme loaded into cache: {}", id);
                }
                cache.put(id, theme);
                return Optional.of(theme);
            }
        } catch (Exception e) {
            LOGGER.error("Failed to load theme '{}'", id, e);
            return Optional.empty();
        }
    }
}
