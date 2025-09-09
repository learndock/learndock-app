package com.learndock.learndock.core.events;

import com.timonmdy.xami.core.events.Event;
import com.timonmdy.xami.core.events.EventBus;
import com.timonmdy.xami.core.events.EventListener;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;


public class DefaultEventBus implements EventBus {

    private final Map<Class<? extends Event>, List<EventListener<?>>> listeners = new ConcurrentHashMap<>();

    @Override
    public <T extends Event> void register(Class<T> eventClass, EventListener<T> listener) {
        listeners.computeIfAbsent(eventClass, key -> new CopyOnWriteArrayList<>()).add(listener);
    }

    @Override
    public <T extends Event> void unregister(Class<T> eventClass, EventListener<T> listener) {
        List<EventListener<?>> registered = listeners.get(eventClass);
        if (registered != null) {
            registered.remove(listener);
            if (registered.isEmpty()) {
                listeners.remove(eventClass);
            }
        }
    }

    @Override
    @SuppressWarnings("unchecked")
    public <T extends Event> void post(T event) {
        List<EventListener<?>> registered = listeners.getOrDefault(event.getClass(), List.of());
        for (EventListener<?> rawListener : registered) {
            ((EventListener<T>) rawListener).handle(event);
        }
    }
}