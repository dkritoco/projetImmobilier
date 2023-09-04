package com.cansell.web.model;

import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Data
@Table(name = "users", uniqueConstraints = @UniqueConstraint(columnNames = "email"))
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "native")
    @GenericGenerator(name = "native", strategy = "native")
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "phone")
    private String phone;

    @Column(name = "address")
    private String address;

    @Column(name = "ville")
    private String ville;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "registered_owner")
    private boolean registeredOwner;

    @ManyToOne
    @JoinColumn(name = "property_id")
    private Propertys propertyId;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

}

