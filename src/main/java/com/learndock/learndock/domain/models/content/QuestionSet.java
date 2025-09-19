package com.learndock.learndock.domain.models.content;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
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

    @Column
    private Long number;

    @Column(nullable = false)
    private String title;

    @Column
    private List<String> relatedLearningFields;

    @Column
    // Location in FIAusbV (e. g. §4 Absatz 2 Nummer ...)
    private String locationInRegulation;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "catalog_id")
    @JsonIgnore
    private Catalog catalog;

    @OneToMany(mappedBy = "questionSet", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<QuestionSetExample> examples = new ArrayList<>();

    @OneToMany(mappedBy = "questionSet", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Topic> topics = new ArrayList<>();

    @JsonProperty("catalogId")
    public Long getCatalogId() {
        return catalog != null ? catalog.getId() : null;
    }
}
