package com.cansell.web.dao;

import com.cansell.web.model.Photo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhotoDao extends JpaRepository<Photo, Long> {
}
