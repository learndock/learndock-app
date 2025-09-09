package com.learndock.learndock.domain.models.system;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum StatName {
    SOME_NUMBER("SOME_NUMBER");

    private final String name;
}