package com.opsflow.core.application;

import com.opsflow.core.domain.user.User;
import com.opsflow.core.domain.user.UserRepository;
import com.opsflow.core.domain.user.UserStatus;
import com.opsflow.core.dto.common.PageResponse;
import com.opsflow.core.dto.user.CreateUserRequest;
import com.opsflow.core.dto.user.UserResponse;
import com.opsflow.core.error.DuplicateResourceException;
import com.opsflow.core.error.ResourceNotFoundException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @Test
    void createSavesUserWhenEmailIsNew() {
        when(userRepository.existsByEmailIgnoreCase("demo@example.com"))
                .thenReturn(false);
        when(userRepository.save(any(User.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        UserResponse response = userService.create(new CreateUserRequest(
                "Demo@Example.com", "password123", "Demo", "User"));

        assertThat(response.email()).isEqualTo("demo@example.com");
        assertThat(response.firstName()).isEqualTo("Demo");
        assertThat(response.status()).isEqualTo(UserStatus.ACTIVE);
        verify(userRepository).save(any(User.class));
    }

    @Test
    void createRejectsDuplicateEmail() {
        when(userRepository.existsByEmailIgnoreCase("demo@example.com"))
                .thenReturn(true);

        assertThatThrownBy(() -> userService.create(new CreateUserRequest(
                "demo@example.com", "password123", "Demo", "User")))
                .isInstanceOf(DuplicateResourceException.class);
    }

    @Test
    void getByIdReturnsUserWhenItExists() {
        UUID id = UUID.randomUUID();
        when(userRepository.findById(id)).thenReturn(Optional.of(
                new User("demo@example.com", "{hash}", "Demo", "User")));

        UserResponse response = userService.getById(id);

        assertThat(response.email()).isEqualTo("demo@example.com");
    }

    @Test
    void getByIdThrowsWhenUserIsMissing() {
        UUID id = UUID.randomUUID();
        when(userRepository.findById(id)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> userService.getById(id))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    @Test
    void findAllReturnsPageOfUsers() {
        User user = new User("demo@example.com", "{hash}", "Demo", "User");
        Pageable pageable = PageRequest.of(0, 20);
        when(userRepository.findAll(pageable))
                .thenReturn(new PageImpl<>(List.of(user), pageable, 1));

        PageResponse<UserResponse> page = userService.findAll(pageable);

        assertThat(page.content()).hasSize(1);
        assertThat(page.totalElements()).isEqualTo(1);
        assertThat(page.page()).isZero();
    }
}
