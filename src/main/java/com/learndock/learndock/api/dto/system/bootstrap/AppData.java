package com.learndock.learndock.api.dto.system.bootstrap;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * AppData is a data transfer object that contains information about the application.
 * <p>
 * Default values are set in <code>/resources/config/app-data.json</code>
 * </p>
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppData {
    @JsonProperty("APPLICATION_NAME")
    private String APPLICATION_NAME;

    @JsonProperty("CONTACT_EMAIL")
    private String CONTACT_EMAIL;
}