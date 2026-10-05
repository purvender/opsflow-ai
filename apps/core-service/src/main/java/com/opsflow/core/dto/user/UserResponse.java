package com.opsflow.core.dto.user;

import com.opsflow.core.domain.user.UserStatus;

import java.time.Instant;
import java.util.UUID;

public record UserResponse(
        UUID id,
        String email,
        String firstName,
        String lastName,
        UserStatus status,
        Instant createdAt,
        Instant updatedAt
) {
}
