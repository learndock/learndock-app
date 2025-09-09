package com.learndock.learndock.api.controller.themes;

import com.learndock.learndock.api.dto.themes.Theme;
import com.learndock.learndock.api.dto.themes.ThemeInfo;
import com.learndock.learndock.service.themes.ThemeService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/themes")
public class ThemeController {

    @Autowired
    private ThemeService themeService;

    @GetMapping
    public ResponseEntity<List<ThemeInfo>> listThemes() {
        return ResponseEntity.ok(new ArrayList<>(themeService.getAvailableThemeInfos()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Theme> getTheme(@PathVariable String id) {
        return themeService.getTheme(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
