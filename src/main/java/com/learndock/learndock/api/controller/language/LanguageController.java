package com.learndock.learndock.api.controller.language;

import com.learndock.learndock.service.language.LanguageKeyRegistry;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.MessageSource;
import org.springframework.context.NoSuchMessageException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

@AllArgsConstructor
@RestController
@RequestMapping("/api/lang")
public class LanguageController {

    private static final Logger LOGGER = LoggerFactory.getLogger(LanguageController.class);

    private MessageSource messageSource;
    private LanguageKeyRegistry keyRegistry;

    @GetMapping("/{lang}")
    public Map<String, String> getTranslations(@PathVariable String lang) {
        Locale locale = Locale.forLanguageTag(lang);
        Map<String, String> map = new HashMap<>();

        for (String key : keyRegistry.getKnownKeys()) {
            try {
                String value = messageSource.getMessage(key, null, locale);
                map.put(key, value);
            } catch (NoSuchMessageException e) {
                LOGGER.warn("Missing translation for key '{}' in locale '{}'", key, locale);
                map.put(key, key);
            }
        }

        return map;
    }
}
