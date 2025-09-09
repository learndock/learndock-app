package com.learndock.learndock.core.modules;

import com.learndock.learndock.config.ModuleUserConfig;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.WatchEvent;
import java.nio.file.WatchService;

import static java.nio.file.StandardWatchEventKinds.ENTRY_CREATE;
import static java.nio.file.StandardWatchEventKinds.ENTRY_MODIFY;

@RequiredArgsConstructor
public class ModuleWatcher implements Runnable {
    private static final Logger LOGGER = LoggerFactory.getLogger(ModuleWatcher.class);
    private final ModuleLoader loader;
    private final Path modulesPath = Path.of("./modules");

    @Override
    public void run() {
        try (WatchService watchService = modulesPath.getFileSystem().newWatchService()) {
            modulesPath.register(watchService, ENTRY_CREATE, ENTRY_MODIFY);

            while (!Thread.currentThread().isInterrupted()) {
                for (WatchEvent<?> event : watchService.take().pollEvents()) {
                    Path file = modulesPath.resolve((Path) event.context());
                    if (!file.toString().endsWith(".jar")) continue;

                    if (ModuleUserConfig.LOG_MODULE_CHANGES.get()) {
                        logChange(event.kind(), file);
                    }
                    reload(file);
                }
            }
        } catch (IOException | InterruptedException e) {
            LOGGER.error("Module watcher stopped due to error", e);
            Thread.currentThread().interrupt();
        }
    }

    private void logChange(WatchEvent.Kind<?> kind, Path file) {
        loader.withModuleName(file.toFile().toPath(), name -> LOGGER.info("Module changed: {} ({})", name, kind.name()));
    }

    private void reload(Path jarPath) {
        if (ModuleUserConfig.RELOAD_SINGLE_MODULE.get()) {
            loader.reloadModule(jarPath);
        } else {
            loader.unloadModules();
            loader.loadModules();
        }
    }
}
