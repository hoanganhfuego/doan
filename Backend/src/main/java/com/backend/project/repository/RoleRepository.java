/**
 * Written by minhhq
 */

package com.backend.project.repository;

import com.backend.project.model.Role;
import com.backend.project.model.ERole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
	Optional<Role> findByName(ERole name);
}
