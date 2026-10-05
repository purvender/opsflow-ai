package com.opsflow.core.application;

import com.opsflow.core.domain.user.User;
import com.opsflow.core.domain.user.UserRepository;
import com.opsflow.core.dto.common.PageResponse;
import com.opsflow.core.dto.user.CreateUserRequest;
import com.opsflow.core.dto.user.UserResponse;
import com.opsflow.core.error.DuplicateResourceException;
import com.opsflow.core.error.ResourceNotFoundException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public UserResponse create(CreateUserRequest request) {
        String email = request.email().trim().toLowerCase();

        if (userRepository.existsByEmailIgnoreCase(email)) {
            throw new DuplicateResourceException(
                    "User email already exists: " + email
            );
        }

        // Temporary Day 3 behavior.
        // Replace with a real password encoder on Day 4.
        String passwordHash = "{day3-placeholder}" + request.password();

        try {
            User user = userRepository.save(
                    new User(
                            email,
                            passwordHash,
                            request.firstName().trim(),
                            request.lastName().trim()
                    )
            );

            return toResponse(user);
        } catch (DataIntegrityViolationException exception) {
            throw new DuplicateResourceException(
                    "User email already exists: " + email
            );
        }
    }

    @Transactional(readOnly = true)
    public UserResponse getById(UUID id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "User not found: " + id
                ));

        return toResponse(user);
    }

    @Transactional(readOnly = true)
    public PageResponse<UserResponse> findAll(Pageable pageable) {
        Page<UserResponse> page = userRepository.findAll(pageable)
                .map(this::toResponse);

        return PageResponse.from(page);
    }

    private UserResponse toResponse(User user) {
        return new UserResponse(
                user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getStatus(),
                user.getCreatedAt(),
                user.getUpdatedAt()
        );
    }
}
