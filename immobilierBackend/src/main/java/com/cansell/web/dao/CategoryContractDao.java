package com.cansell.web.dao;

import com.cansell.web.model.CategoryContract;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryContractDao extends JpaRepository<CategoryContract, Long> {
}
