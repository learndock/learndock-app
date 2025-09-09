package com.learndock.learndock.sys.cache;

import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

/**
 * Manages cleanup of multiple GenericCache instances via Spring's scheduler.
 */
@Slf4j
@Component
public class GenericCacheManager {

    private final List<GenericCache<?, ?>> registeredCaches = new CopyOnWriteArrayList<>();

    /**
     * Register a cache for scheduled expiration cleanup.
     *
     * @param cache the cache to track
     */
    public void register(GenericCache<?, ?> cache) {
        registeredCaches.add(cache);
    }

    /**
     * Evicts expired entries from all registered caches.
     */
    @Scheduled(fixedDelayString = "${app.cache.eviction.interval.millis:300000}") // default: 5 minutes
    public void scheduledEviction() {
        for (GenericCache<?, ?> cache : registeredCaches) {
            cache.evictExpired();
        }
    }
}
