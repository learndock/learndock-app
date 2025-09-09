package com.learndock.learndock.service.language;

import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;

@Configuration
public class LanguageConfig {

    public static final String CUSTOM_LANG_DIR_PATH = "config/language";

    @Bean
    public MessageSource messageSource() {
        ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();

        messageSource.setBasenames(
                "file:./" + CUSTOM_LANG_DIR_PATH + "/messages_custom",
                "classpath:/i18n/messages"
        );

        messageSource.setDefaultEncoding("UTF-8");
        messageSource.setFallbackToSystemLocale(false);
        messageSource.setCacheSeconds(5);

        return messageSource;
    }
}
