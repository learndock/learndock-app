package com.learndock.learndock.domain.models.content;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@Entity
@Table(name = "question_set")
@NoArgsConstructor
@AllArgsConstructor
public class QuestionSet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column
    private List<String> relatedLearningFields;

    @Column
    // Location in FIAusbV (e. g. §4 Absatz 2 Nummer ...)
    private String locationInRegulation;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "catalog_id")
    private Catalog catalog;

    @OneToMany(mappedBy = "questionSet", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<QuestionSetExample> examples = new ArrayList<>();
}
