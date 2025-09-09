package com.learndock.learndock.commands.system;

import com.learndock.learndock.core.annotations.LoggingCommand;
import com.learndock.learndock.core.commands.CommandManager;
import com.learndock.learndock.core.configurations.ConfigManager;
import com.learndock.learndock.service.themes.ThemeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.info.BuildProperties;
import org.springframework.shell.standard.ShellComponent;
import org.springframework.shell.standard.ShellMethod;
import org.springframework.shell.standard.ShellOption;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

import static com.learndock.learndock.config.ServerUserConfig.WEBSERVER_PORT;

@ShellComponent
@Component
public class SystemCommands {

    @Autowired
    private BuildProperties buildProperties;

    @Autowired
    private ThemeService themeService;

    @LoggingCommand
    @ShellMethod("Prints the current version of the server")
    public void version() {
        CommandManager.logResult("Version",
                String.format("\nApp: %s\nVersion: %s\nBuilt: %s",
                        buildProperties.getName(),
                        buildProperties.getVersion(),
                        buildProperties.getTime())
        );
    }

    @LoggingCommand
    @ShellMethod("Prints the port the server is running on")
    public void port() {
        CommandManager.logResult("Port", WEBSERVER_PORT.get().toString());
    }

    @LoggingCommand
    @ShellMethod("Reloads parts of the application. Attention: Some changes may not take effect until the server is restarted.")
    public void reload(
            @ShellOption(
                    defaultValue = ShellOption.NULL,
                    help = "Optional target(s) to reload. If omitted, all targets will be reloaded. Available targets: config, themes"
            )
            List<String> targets
    ) {

        Map<String, Runnable> actions = Map.of(
                "config", () -> {
                    ConfigManager.loadAllConfigs();
                    CommandManager.logResult("reloadConfig", "Reloaded configuration files");
                },
                "themes", () -> {
                    themeService.reload();
                    CommandManager.logResult("reloadThemes", "Reloaded themes");
                }
        );

        if (targets == null || targets.isEmpty()) {
            actions.values().forEach(Runnable::run);
            CommandManager.logResult("reloadAll", "Reloaded all configuration targets");
            return;
        }

        for (String target : targets) {
            Runnable action = actions.get(target.toLowerCase());
            if (action != null) {
                action.run();
            } else {
                CommandManager.logResult("reload", "Unknown target: " + target);
            }
        }
    }

    @LoggingCommand
    @ShellMethod("Stops the server")
    public void stop() {
        System.exit(0);
    }
}
