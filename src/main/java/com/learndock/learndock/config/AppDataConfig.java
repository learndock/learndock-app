package com.learndock.learndock.config;

import com.learndock.learndock.core.annotations.config.DataConfigContent;
import com.learndock.learndock.core.annotations.config.DefaultConfigFile;
import com.learndock.learndock.core.annotations.config.JsonConfigFile;

@JsonConfigFile("app-data.json")
@DefaultConfigFile("app-data.json")
public class AppDataConfig {


    @DataConfigContent
    public static Object APP_DATA;

}
