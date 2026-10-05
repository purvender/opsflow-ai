package com.opsflow.core.application;

import com.opsflow.core.domain.tenant.Tenant;
import com.opsflow.core.domain.tenant.TenantRepository;
import com.opsflow.core.dto.tenant.CreateTenantRequest;
import com.opsflow.core.dto.tenant.TenantResponse;
import com.opsflow.core.error.DuplicateResourceException;
import com.opsflow.core.error.ResourceNotFoundException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class TenantService {

    private final TenantRepository tenantRepository;

    public TenantService(TenantRepository tenantRepository) {
        this.tenantRepository = tenantRepository;
    }

    @Transactional
    public TenantResponse create(CreateTenantRequest request) {
        String name = request.name().trim();
        String slug = request.slug().trim().toLowerCase();

        if (tenantRepository.existsBySlugIgnoreCase(slug)) {
            throw new DuplicateResourceException(
                    "Tenant slug already exists: " + slug
            );
        }

        try {
            Tenant tenant = tenantRepository.save(new Tenant(name, slug));
            return toResponse(tenant);
        } catch (DataIntegrityViolationException exception) {
            throw new DuplicateResourceException(
                    "Tenant slug already exists: " + slug
            );
        }
    }

    @Transactional(readOnly = true)
    public TenantResponse getById(UUID id) {
        Tenant tenant = tenantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Tenant not found: " + id
                ));

        return toResponse(tenant);
    }

    private TenantResponse toResponse(Tenant tenant) {
        return new TenantResponse(
                tenant.getId(),
                tenant.getName(),
                tenant.getSlug(),
                tenant.getStatus(),
                tenant.getCreatedAt(),
                tenant.getUpdatedAt()
        );
    }
}
