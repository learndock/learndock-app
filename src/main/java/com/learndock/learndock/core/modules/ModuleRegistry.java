package com.learndock.learndock.core.modules;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class ModuleRegistry {
    private final List<Module> modules = new ArrayList<>();

    public void register(Module module) {
        modules.add(module);
    }

    public List<Module> getModules() {
        return Collections.unmodifiableList(modules);
    }

    public void clear() {
        modules.clear();
    }
}
