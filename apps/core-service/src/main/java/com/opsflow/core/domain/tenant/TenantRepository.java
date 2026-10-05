package com.opsflow.core.domain.tenant;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface TenantRepository extends JpaRepository<Tenant, UUID> {

    boolean existsBySlugIgnoreCase(String slug);

    Optional<Tenant> findBySlugIgnoreCase(String slug);
}
