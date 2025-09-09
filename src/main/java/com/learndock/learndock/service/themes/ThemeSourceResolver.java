package com.learndock.learndock.service.themes;

import com.learndock.learndock.api.dto.themes.ThemeSource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.nio.file.Path;

@Component
public class ThemeSourceResolver {

    public ThemeSource resolve(String id, Path path) {
        try {
            if (path.toUri().getScheme().equals("jar") || path.toString().contains("classes")) {
                return ThemeSource.PREDEFINED;
            } else {
                return isOverridden(id) ? ThemeSource.EDITED : ThemeSource.USER;
            }
        } catch (Exception e) {
            return null;
        }
    }

    private boolean isOverridden(String id) {
        try {
            return new ClassPathResource("themes/" + id + ".json").exists();
        } catch (Exception e) {
            return false;
        }
    }
}
