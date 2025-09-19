package com.learndock.learndock.api.controller.content;

import com.learndock.learndock.api.dto.content.CreateTopicRequest;
import com.learndock.learndock.core.annotations.Roles;
import com.learndock.learndock.domain.models.content.Catalog;
import com.learndock.learndock.domain.models.content.QuestionSet;
import com.learndock.learndock.domain.models.content.Topic;
import com.learndock.learndock.domain.models.users.UserRole;
import com.learndock.learndock.service.content.TopicService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/topics")
@RequiredArgsConstructor
public class TopicController {

    private final TopicService topicService;

    @GetMapping("/question-set/{id}")
    public List<Topic> getForQuestionSet(@PathVariable Long id) {
        return topicService.getByQuestionSetId(id);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Topic> getById(@PathVariable Long id) {
        return topicService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/catalog")
    public ResponseEntity<Catalog> getRootCatalog(@PathVariable Long id) {
        return topicService.getById(id)
                .map(Topic::getQuestionSet)
                .map(QuestionSet::getCatalog)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Roles(UserRole.MANAGE_TOPICS)
    @PostMapping
    public ResponseEntity<Topic> create(@RequestBody CreateTopicRequest request) {
        return topicService
                .create(
                        request.getQuestionSetId(),
                        request.getTitle()
                )
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Roles(UserRole.MANAGE_TOPICS)
    @PatchMapping("/{id}")
    public ResponseEntity<Topic> update(@PathVariable Long id, @RequestBody Topic topic) {
        return topicService.update(id, topic)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public List<Topic> search(
            @RequestParam String query,
            @RequestParam(required = false) Long catalogId
    ) {
        if (catalogId != null) {
            return topicService.searchByCatalog(catalogId, query);
        }
        return topicService.search(query, 100);
    }

    @Roles(UserRole.MANAGE_TOPICS)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (topicService.delete(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
