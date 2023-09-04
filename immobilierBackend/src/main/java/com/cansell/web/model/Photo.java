package com.cansell.web.model;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@Table(name = "photo")
public class Photo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "photo_id")
    private Long photoId;


    @Basic(fetch = FetchType.LAZY)
    @Column(name = "jpg_photo")
    private String jpgPhoto;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "property_id")
    private Propertys property;

    @ManyToOne
    @JoinColumn(name = "type_photo_Id")
    private TypePhoto typePhoto;

}
