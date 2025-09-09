package com.learndock.learndock.core.modules;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.learndock.learndock.config.ModuleUserConfig;
import com.learndock.learndock.context.AppModuleContext;
import com.learndock.learndock.core.events.DefaultEventBus;
import com.timonmdy.xami.core.events.EventBus;
import com.timonmdy.xami.core.modules.Module;
import com.timonmdy.xami.core.modules.ModuleMetadata;
import io.github.classgraph.ClassGraph;
import io.github.classgraph.ScanResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;

import java.io.File;
import java.io.InputStream;
import java.net.URL;
import java.net.URLClassLoader;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.function.Consumer;
import java.util.jar.JarFile;
import java.util.zip.ZipEntry;


public class ModuleLoader {
    public final Logger LOGGER = LoggerFactory.getLogger(ModuleLoader.class);

    private final File moduleDir = new File("./modules");
    private final AppModuleContext context;
    private final List<LoadedModule> loaded = new ArrayList<>();

    public ModuleLoader(AppModuleContext context) {
        this.context = context;
    }

    public static ModuleLoader create(ApplicationContext context) {
        EventBus eventBus = new DefaultEventBus();
        ModuleRegistry registry = new ModuleRegistry();
        AppModuleContext moduleContext = new AppModuleContext(eventBus, context, registry);

        return new ModuleLoader(moduleContext);
    }

    public void loadModules() {
        if (!moduleDir.exists()) moduleDir.mkdirs();
        File[] jars = moduleDir.listFiles(f -> f.getName().endsWith(".jar"));

        if (jars == null || jars.length == 0) {
            LOGGER.info("No modules found.");
            return;
        } else {
            LOGGER.info("Found {} modules.", jars.length);
        }

        for (File jar : jars) {
            try {
                loadModule(jar.toPath());
            } catch (Exception e) {
                LOGGER.error("Failed to load module: {}", jar.getName(), e);
            }
        }
    }

    public void unloadModules() {
        for (LoadedModule lm : loaded) unloadModule(lm);
        loaded.clear();
    }

    public void reloadModule(Path jarPath) {
        unloadModule(jarPath);
        loadModule(jarPath);
    }

    public void unloadModule(Path jarPath) {
        LoadedModule toUnload = null;
        for (LoadedModule lm : loaded) {
            if (lm.file().toPath().equals(jarPath)) {
                toUnload = lm;
                break;
            }
        }

        if (toUnload != null) {
            unloadModule(toUnload);
        } else {
            LOGGER.warn("No loaded module found for {}", jarPath.getFileName());
        }
    }

    public void unloadModule(LoadedModule toUnload) {
        try {
            toUnload.module().onUnload();
            toUnload.classLoader().close();
            loaded.remove(toUnload);
            if (ModuleUserConfig.LOG_MODULE_LOADING.get()) {
                withModuleName(toUnload.file().toPath(), name -> LOGGER.info("Unloaded module: {}", name));
            }
        } catch (Exception e) {
            LOGGER.error("Failed to unload module: {}", toUnload.file().getName(), e);
        }
    }

    private void loadModule(Path jarPath) {
        try {
            URLClassLoader cl = new URLClassLoader(
                    new URL[]{jarPath.toUri().toURL()},
                    this.getClass().getClassLoader()
            );

            try (ScanResult scanResult = new ClassGraph()
                    .addClassLoader(cl)
                    .overrideClasspath(jarPath.toFile())
                    .enableClassInfo()
                    .scan()) {

                List<Class<Module>> moduleClasses = scanResult.getClassesImplementing(Module.class.getName())
                        .loadClasses(Module.class);

                if (moduleClasses.isEmpty()) {
                    LOGGER.error("No module found in {}. Make sure to implement the Module interface.", jarPath.getFileName());
                    return;
                }

                if (moduleClasses.size() > 1) {
                    LOGGER.error("Multiple Module implementations found in {}. Using the first one: {}",
                            jarPath.getFileName(), moduleClasses.get(0).getName());
                }

                Class<?> moduleClass = moduleClasses.get(0);
                Module module = (Module) moduleClass.getDeclaredConstructor().newInstance();

                Optional<ModuleMetadata> metadataOpt = readMetadata(jarPath.toFile());
                if (ModuleUserConfig.LOG_MODULE_LOADING.get()) {
                    withModuleName(jarPath.toFile().toPath(), name -> LOGGER.info("Loaded module: {}", name));
                }

                module.onLoad(context);
                loaded.add(new LoadedModule(jarPath.toFile(), module, cl, metadataOpt));
            }

        } catch (Exception e) {
            LOGGER.error("Failed to load module: {}", jarPath.getFileName(), e);
        }
    }


    public void withModuleName(Path jarPath, Consumer<String> consumer) {
        String name = readMetadata(jarPath.toFile())
                .map(ModuleMetadata::name)
                .orElseGet(() -> jarPath.getFileName().toString());

        consumer.accept(name);
    }

    private Optional<ModuleMetadata> readMetadata(File jarFile) {
        try (JarFile jar = new JarFile(jarFile)) {
            ZipEntry entry = jar.getEntry("module.json");
            if (entry == null) {
                LOGGER.warn("module.json not found in {}", jarFile.getName());
                return Optional.empty();
            }

            try (InputStream is = jar.getInputStream(entry)) {
                return Optional.ofNullable(new ObjectMapper().readValue(is, ModuleMetadata.class));
            }
        } catch (Exception e) {
            LOGGER.error("Internal error while trying to read module.json from {}", jarFile.getName(), e);
            return Optional.empty();
        }
    }
}
