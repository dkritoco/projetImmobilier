package com.cansell.web.dao;

import com.cansell.web.model.ValidationState;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ValidationStateDao extends JpaRepository<ValidationState, Long> {
}
