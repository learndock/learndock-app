package com.learndock.learndock.context;

import com.learndock.learndock.core.modules.ModuleRegistry;
import com.timonmdy.xami.core.events.EventBus;
import com.timonmdy.xami.core.modules.ModuleContext;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.context.ApplicationContext;

@AllArgsConstructor
public class AppModuleContext implements ModuleContext {
    private final EventBus eventBus;
    @Getter
    private final ApplicationContext spring;
    @Getter
    private final ModuleRegistry moduleRegistry;
}
