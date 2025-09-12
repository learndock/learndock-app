package com.learndock.learndock.api.controller.content;

import com.learndock.learndock.core.annotations.Roles;
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

    @Roles(UserRole.MANAGE_TOPICS)
    @PostMapping
    public Topic create(@RequestBody Topic Topic) {
        return topicService.create(Topic);
    }

    @Roles(UserRole.MANAGE_TOPICS)
    @PutMapping("/{id}")
    public ResponseEntity<Topic> updateTitle(@PathVariable Long id, @RequestBody String title) {
        return topicService.updateTitle(id, title)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
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
