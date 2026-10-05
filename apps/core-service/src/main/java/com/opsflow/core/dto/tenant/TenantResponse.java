package com.opsflow.core.dto.tenant;

import com.opsflow.core.domain.tenant.TenantStatus;

import java.time.Instant;
import java.util.UUID;

public record TenantResponse(
        UUID id,
        String name,
        String slug,
        TenantStatus status,
        Instant createdAt,
        Instant updatedAt
) {
}
