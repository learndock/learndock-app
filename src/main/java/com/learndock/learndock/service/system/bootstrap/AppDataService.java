package com.learndock.learndock.service.system.bootstrap;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.learndock.learndock.api.dto.system.bootstrap.AppData;
import org.springframework.stereotype.Service;

import java.util.Map;

import static com.learndock.learndock.config.AppDataConfig.APP_DATA;

/**
 * AppDataService handles loading, validating, and serving application metadata.
 * <p>
 * It ensures the presence of an editable config file at <code>/config/app-data.json</code>,
 * and merges missing fields from the default config located at <code>classpath:/config/app-data.json</code>.
 * </p>
 */
@Service
public class AppDataService {

    private final ObjectMapper objectMapper;

    public AppDataService() {
        this.objectMapper = new ObjectMapper()
                .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
                .configure(DeserializationFeature.FAIL_ON_NULL_FOR_PRIMITIVES, false);
    }

    /**
     * Converts the raw config map (APP_DATA) into a typed AppData DTO.
     * Unknown fields will be ignored; missing known fields will be null.
     *
     * @return AppData object with values from APP_DATA
     */
    public AppData getAppData() {
        if (APP_DATA instanceof Map<?, ?> rawMap) {
            return objectMapper.convertValue(rawMap, AppData.class);
        }
        throw new IllegalStateException("APP_DATA is not a valid map: " + APP_DATA);
    }
}
