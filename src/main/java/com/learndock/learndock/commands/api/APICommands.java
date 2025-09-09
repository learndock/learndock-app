package com.learndock.learndock.commands.api;

import com.learndock.learndock.api.dto.themes.ThemeSource;
import com.learndock.learndock.core.annotations.LoggingCommand;
import com.learndock.learndock.core.commands.CommandManager;
import com.learndock.learndock.service.themes.ThemeService;
import lombok.AllArgsConstructor;
import org.springframework.shell.standard.ShellComponent;
import org.springframework.shell.standard.ShellMethod;
import org.springframework.shell.standard.ShellOption;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

import java.io.File;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static com.learndock.learndock.service.language.LanguageConfig.CUSTOM_LANG_DIR_PATH;

@ShellComponent
@AllArgsConstructor
public class APICommands {

    private final RequestMappingHandlerMapping mapping;
    private final ThemeService themeService;

    @LoggingCommand
    @ShellMethod("Prints registered API routes, sorted by path")
    public void routes(@ShellOption(defaultValue = ShellOption.NULL) String path) {
        int MIN_ROUTE_LENGTH = 10;
        // Paths to exclude from the output
        Set<String> excluded = Set.of("/error");

        mapping.getHandlerMethods().keySet().stream()
                .flatMap(info -> {
                    var paths = info.getPathPatternsCondition() != null
                            ? info.getPathPatternsCondition().getPatternValues()
                            : info.getDirectPaths();
                    var method = info.getMethodsCondition().toString();
                    return paths.stream()
                            .filter(p -> !excluded.contains(p) && (path == null || p.startsWith(path)))
                            .map(p -> String.format("%-" + MIN_ROUTE_LENGTH + "s %s", method, p));
                })
                .sorted(Comparator.comparing(s -> s.substring(MIN_ROUTE_LENGTH)))
                .forEach(r -> CommandManager.logResult("Route", r));
    }

    @LoggingCommand
    @ShellMethod("Lists available languages and their source (predefined/user/edited)")
    public void languages() {
        try {
            File resDir = new File(Objects.requireNonNull(getClass().getClassLoader().getResource("i18n")).toURI());
            File cusDir = new File(CUSTOM_LANG_DIR_PATH);

            Set<String> pre = Optional.ofNullable(resDir.listFiles((d, n) -> n.startsWith("messages_") && !n.contains("custom"))).stream().flatMap(Arrays::stream)
                    .map(f -> f.getName().replace("messages_", "").replace(".properties", ""))
                    .collect(Collectors.toSet());

            Set<String> usr = Optional.ofNullable(cusDir.listFiles((d, n) -> n.startsWith("messages_custom_"))).stream().flatMap(Arrays::stream)
                    .map(f -> f.getName().replace("messages_custom_", "").replace(".properties", ""))
                    .collect(Collectors.toSet());

            new TreeSet<>(Stream.concat(pre.stream(), usr.stream()).collect(Collectors.toSet()))
                    .forEach(lang -> CommandManager.logResult("Language", lang + " (" +
                            (pre.contains(lang) && usr.contains(lang) ? "edited" : pre.contains(lang) ? "predefined" : "user") + ")"));
        } catch (Exception ignored) {
        }
    }

    @LoggingCommand
    @ShellMethod("Lists available themes and their source (predefined/user/edited)")
    public void themes() {
        themeService.getAvailableThemeIdentifiers()
                .stream()
                .sorted()
                .forEach(id -> {
                    ThemeSource source = themeService.getThemeSource(id);
                    String label = switch (source) {
                        case PREDEFINED -> "predefined";
                        case USER -> "user";
                        case EDITED -> "edited";
                    };
                    CommandManager.logResult("Theme", id + " (" + label + ")");
                });
    }
}
