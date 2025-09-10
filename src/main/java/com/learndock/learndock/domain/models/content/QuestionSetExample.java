package com.learndock.learndock.domain.models.content;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "question_set_example")
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"questionSet"})
public class QuestionSetExample {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String description;

    @Column
    // Can be anything, but usually "betriebliche Handlung" or "Qualifikation"
    private String type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_set_id")
    private QuestionSet questionSet;
}
