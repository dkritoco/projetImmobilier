package com.cansell.web.dao;

import com.cansell.web.model.Propertys;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PropertysDao extends JpaRepository<Propertys, Long> {
    @Query("SELECT p.propertyId, p.realEstateType, p.price, p.numberOfRooms, p.houseSurface, p.parking, pt.jpgPhoto, u.address " +
            "FROM Propertys p " +
            "JOIN User u ON u.propertyId = p.propertyId " +
            "JOIN Photo pt ON pt.property = p.propertyId")
    List<Object[]> getCustomPropertyData();


    @Query("SELECT p.propertyId, p.realEstateType, p.price, p.numberOfRooms, p.houseSurface, p.parking, pt.jpgPhoto, u.address " +
            "FROM Propertys p " +
            "JOIN User u ON u.propertyId = p.propertyId " +
            "JOIN Photo pt ON pt.property = p.propertyId " +
            "JOIN pt.typePhoto tp " +
            "WHERE tp.typePhoto = :typePhoto")
    List<Object[]> getCustomPropertyDataParameter(@Param("typePhoto") String typePhoto);

    @Query("SELECT p.propertyId, p.realEstateType, p.price, p.numberOfRooms, p.houseSurface, p.parking, pt.jpgPhoto, u.address " +
            "FROM Propertys p " +
            "JOIN User u ON u.propertyId = p.propertyId " +
            "JOIN Photo pt ON pt.property = p.propertyId " +
            "JOIN pt.typePhoto tp " +
            "WHERE u.ville = :ville")
    List<Object[]> getCustomPropertyDataParameterVille(@Param("ville") String ville);

    @Query("SELECT p.propertyId, p.realEstateType, p.price, p.numberOfRooms, p.houseSurface, p.parking, pt.jpgPhoto, u.address " +
            "FROM Propertys p " +
            "JOIN User u ON u.propertyId = p.propertyId " +
            "JOIN Photo pt ON pt.property = p.propertyId " +
            "JOIN pt.typePhoto tp " +
            "WHERE tp.typePhoto = :typePhoto " +
            "AND u.ville = :ville")
    List<Object[]> getCustomPropertyDataParameterAll(@Param("ville") String ville, @Param("typePhoto") String typePhoto);



}
