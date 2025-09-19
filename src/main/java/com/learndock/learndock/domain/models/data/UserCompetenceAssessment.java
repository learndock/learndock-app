package com.learndock.learndock.domain.models.data;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.learndock.learndock.domain.models.content.Competence;
import com.learndock.learndock.domain.models.users.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
@Entity
@Table(name = "user_competence_assessment")
@NoArgsConstructor
@AllArgsConstructor
public class UserCompetenceAssessment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "competence_id")
    private Competence competence;

    private int assessmentValue;

    @Column
    private Date assessmentDate;

}
