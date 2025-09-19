package com.learndock.learndock.api.dto.content;

import lombok.Data;

import java.util.List;

@Data
public class CreateQuestionSetRequest {
    private Long catalogId;
    private String title;
    private String locationInRegulation;
    private List<String> relatedLearningFields;
}
