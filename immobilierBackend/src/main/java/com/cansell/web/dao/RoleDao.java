package com.cansell.web.dao;

import com.cansell.web.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleDao extends JpaRepository<Role, Long> {
    Role findByNameRole(String nameRole);

}
