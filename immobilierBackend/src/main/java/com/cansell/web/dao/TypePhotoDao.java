package com.cansell.web.dao;

import com.cansell.web.model.TypePhoto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TypePhotoDao extends JpaRepository<TypePhoto, Long> {
}
