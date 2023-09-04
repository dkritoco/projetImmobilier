package com.cansell.web.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "validation_state")
public class ValidationState {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "validation_state_id")
    private Long validationStateId;

    @Column(name = "description_state")
    private String descriptionState;
}
