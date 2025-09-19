package com.learndock.learndock.api.dto.content;

import lombok.Data;

import java.util.List;

@Data
public class EditQuestionSetRequest {
    private String title;
    private String locationInRegulation;
    private List<String> relatedLearningFields;
}
