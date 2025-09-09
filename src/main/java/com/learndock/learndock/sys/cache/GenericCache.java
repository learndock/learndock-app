package com.learndock.learndock.sys.cache;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

import java.time.Duration;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.BiConsumer;
import java.util.function.Function;

/**
 * A thread-safe, generic cache with expiration and optional reloading.
 *
 * @param <K> the key type
 * @param <V> the value type
 */
@Slf4j
public class GenericCache<K, V> {

    private final Map<K, CachedValue<V>> cache = new ConcurrentHashMap<>();
    private final Duration expiration;
    private final Function<K, Optional<V>> loader;
    private final BiConsumer<K, V> onEvict;

    /**
     * Creates a new generic cache.
     *
     * @param expiration the expiration duration for entries
     * @param loader     the fallback loader to use on cache miss
     */
    public GenericCache(Duration expiration, Function<K, Optional<V>> loader) {
        this(expiration, loader, (k, v) -> {
        });
    }

    /**
     * Creates a new generic cache with an eviction callback.
     *
     * @param expiration the expiration duration for entries
     * @param loader     the fallback loader to use on cache miss
     * @param onEvict    a callback to be invoked when an entry is evicted
     */
    public GenericCache(Duration expiration, Function<K, Optional<V>> loader, BiConsumer<K, V> onEvict) {
        this.expiration = expiration;
        this.loader = loader;
        this.onEvict = onEvict != null ? onEvict : (k, v) -> {
        };
    }

    /**
     * Returns a cached value or loads it using the loader.
     *
     * @param key the key to retrieve
     * @return optional containing the value
     */
    public Optional<V> get(K key) {
        CachedValue<V> cached = cache.get(key);
        if (cached != null && !cached.isExpired(expiration)) {
            cached.touch();
            return Optional.of(cached.getValue());
        }

        if (cached != null) {
            evict(key); // Will trigger onEvict
        }

        Optional<V> loaded = loader.apply(key);
        loaded.ifPresent(value -> cache.put(key, new CachedValue<>(value)));
        return loaded;
    }

    /**
     * Adds or updates a value in the cache.
     *
     * @param key   the key
     * @param value the value to cache
     */
    public void put(K key, V value) {
        cache.put(key, new CachedValue<>(value));
    }

    /**
     * Checks if a key exists and is not expired.
     *
     * @param key the key to check
     * @return true if the key is present and not expired
     */
    public boolean contains(K key) {
        CachedValue<V> cached = cache.get(key);
        return cached != null && !cached.isExpired(expiration);
    }

    /**
     * Evicts a single key from the cache and triggers the eviction callback.
     *
     * @param key the key to evict
     */
    public void evict(K key) {
        CachedValue<V> removed = cache.remove(key);
        if (removed != null) {
            onEvict.accept(key, removed.getValue());
        }
    }

    /**
     * Clears the cache entirely and triggers eviction callbacks for all entries.
     */
    public void clear() {
        for (Map.Entry<K, CachedValue<V>> entry : cache.entrySet()) {
            onEvict.accept(entry.getKey(), entry.getValue().getValue());
        }
        cache.clear();
    }

    /**
     * Returns the current size of the cache.
     *
     * @return number of entries in the cache
     */
    public int size() {
        return cache.size();
    }

    /**
     * Removes all expired entries from the cache and triggers eviction callbacks.
     */
    public void evictExpired() {
        cache.entrySet().removeIf(entry -> {
            if (entry.getValue().isExpired(expiration)) {
                onEvict.accept(entry.getKey(), entry.getValue().getValue());
                return true;
            }
            return false;
        });
    }

    /**
     * Internal class representing a cached value along with last access time.
     *
     * @param <V> the value type
     */
    @Getter
    private static class CachedValue<V> {
        private final V value;
        private long lastAccessed;

        CachedValue(V value) {
            this.value = value;
            this.touch();
        }

        /**
         * Updates the last accessed timestamp.
         */
        void touch() {
            this.lastAccessed = System.currentTimeMillis();
        }

        /**
         * Checks whether the cached value has expired.
         *
         * @param expiration the expiration duration
         * @return true if expired
         */
        boolean isExpired(Duration expiration) {
            return System.currentTimeMillis() - lastAccessed > expiration.toMillis();
        }
    }
}
