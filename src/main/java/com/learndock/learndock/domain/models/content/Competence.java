package com.learndock.learndock.domain.models.content;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@Entity
@Table(name = "competence")
@NoArgsConstructor
@AllArgsConstructor
public class Competence {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "competence_topic",
            joinColumns = @JoinColumn(name = "competence_id"),
            inverseJoinColumns = @JoinColumn(name = "topic_id")
    )
    private List<Topic> topics;
}
