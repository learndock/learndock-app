package com.learndock.learndock.core.modules;

import com.timonmdy.xami.core.modules.Module;
import com.timonmdy.xami.core.modules.ModuleMetadata;

import java.io.File;
import java.net.URLClassLoader;
import java.util.Optional;

public record LoadedModule(File file, Module module, URLClassLoader classLoader, Optional<ModuleMetadata> metadata) {
}
