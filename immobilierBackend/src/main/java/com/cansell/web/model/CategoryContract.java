package com.cansell.web.model;

import javax.persistence.*;

@Entity
@Table(name = "category_contract")
public class CategoryContract {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "contract_id")
    private Long contractId;

    @Column(name = "state_contract")
    private boolean stateContract;

}

