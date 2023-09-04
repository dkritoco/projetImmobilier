package com.cansell.web.model;

import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Data
@Table(name = "Propertys")
public class Propertys {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "property_id")
    private Long propertyId;

    @Column(name = "real_estate_type")
    private String realEstateType;

    @Column(name = "real_estate_age")
    private Byte realEstateAge;

    @Column(name = "number_of_showers")
    private Integer numberOfShowers;

    @Column(name = "number_of_bedrooms")
    private Integer numberOfBedrooms;

    @Column(name = "number_of_rooms")
    private Integer numberOfRooms;

    @Column(name = "needs_renovation")
    private Boolean needsRenovation;

    @Column(name = "land_surface")
    private BigDecimal landSurface;

    @Column(name = "living_room_surface")
    private BigDecimal livingRoomSurface;

    @Column(name = "house_surface")
    private BigDecimal houseSurface;

    @Column(name = "parking")
    private int parking;

    @Column(name = "cellar")
    private Boolean cellar;

    @Column(name = "cellar_surface")
    private BigDecimal cellarSurface;

    @Column(name = "balcony")
    private Boolean balcony;

    @Column(name = "balcony_surface")
    private BigDecimal balconySurface;

    @Column(name = "pool")
    private Boolean pool;

    @Column(name = "pool_exposure")
    private String poolExposure;

    @Column(name = "house_view")
    private String houseView;

    @Column(name = "house_quality")
    private String houseQuality;

    @Column(name = "semi_detached")
    private Boolean semiDetached;

    @Column(name = "environment")
    private String environment;

    @Column(name = "description")
    private String description;

    @Column(name = "price")
    private double price;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private CategoryContract categoryContract;


    @ManyToOne
    private ValidationState validationState;

}
