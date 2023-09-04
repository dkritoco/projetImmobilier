package com.cansell.web.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "type_photo")

public class TypePhoto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "type_photo_id")
    private Long typePhotoId;

    @Column(name = "type_photo")
    private String typePhoto;
}
