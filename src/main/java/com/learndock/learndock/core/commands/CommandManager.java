package com.learndock.learndock.core.commands;

import org.slf4j.LoggerFactory;

public class CommandManager {
    public static void logResult(String command, String result) {
        LoggerFactory.getLogger("cmd/" + command).info(result);
    }

    public static void logExecution(String command) {
        LoggerFactory.getLogger("cmd").info("Console executed command {}", command);
    }
}
