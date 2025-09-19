package com.learndock.learndock.api.dto.content;

import lombok.Data;

@Data
public class CreateTopicRequest {
    private Long questionSetId;
    private String title;
}
