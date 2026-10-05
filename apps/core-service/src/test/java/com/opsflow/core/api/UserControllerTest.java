package com.opsflow.core.api;

import com.opsflow.core.application.UserService;
import com.opsflow.core.dto.common.PageResponse;
import com.opsflow.core.dto.user.UserResponse;
import com.opsflow.core.domain.user.UserStatus;
import com.opsflow.core.error.DuplicateResourceException;
import com.opsflow.core.error.ResourceNotFoundException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(UserController.class)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private UserService userService;

    @Test
    void createReturns200ForValidRequest() throws Exception {
        UserResponse response = new UserResponse(
                UUID.randomUUID(), "demo@example.com", "Demo", "User",
                UserStatus.ACTIVE, Instant.now(), Instant.now());
        when(userService.create(any())).thenReturn(response);

        mockMvc.perform(post("/api/v1/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"demo@example.com\",\"password\":\"password123\",\"firstName\":\"Demo\",\"lastName\":\"User\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("demo@example.com"));
    }

    @Test
    void createReturns400ForInvalidEmail() throws Exception {
        mockMvc.perform(post("/api/v1/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"bad\",\"password\":\"password123\",\"firstName\":\"Demo\",\"lastName\":\"User\"}"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value("VALIDATION_ERROR"));
    }

    @Test
    void createReturns409ForDuplicateEmail() throws Exception {
        when(userService.create(any())).thenThrow(
                new DuplicateResourceException(
                        "User email already exists: demo@example.com"));

        mockMvc.perform(post("/api/v1/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"demo@example.com\",\"password\":\"password123\",\"firstName\":\"Demo\",\"lastName\":\"User\"}"))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.code").value("DUPLICATE_RESOURCE"));
    }

    @Test
    void getByIdReturns200ForKnownUser() throws Exception {
        UUID id = UUID.randomUUID();
        when(userService.getById(id)).thenReturn(new UserResponse(
                id, "demo@example.com", "Demo", "User",
                UserStatus.ACTIVE, Instant.now(), Instant.now()));

        mockMvc.perform(get("/api/v1/users/{id}", id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(id.toString()));
    }

    @Test
    void getByIdReturns404ForUnknownUser() throws Exception {
        UUID id = UUID.randomUUID();
        when(userService.getById(id)).thenThrow(
                new ResourceNotFoundException("User not found: " + id));

        mockMvc.perform(get("/api/v1/users/{id}", id))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.code").value("RESOURCE_NOT_FOUND"));
    }

    @Test
    void findAllReturnsPagedUsers() throws Exception {
        UUID id = UUID.randomUUID();
        PageResponse<UserResponse> page = new PageResponse<>(
                List.of(new UserResponse(id, "demo@example.com", "Demo", "User",
                        UserStatus.ACTIVE, Instant.now(), Instant.now())),
                0, 10, 1, 1, true, true);
        when(userService.findAll(any(Pageable.class))).thenReturn(page);

        mockMvc.perform(get("/api/v1/users")
                        .param("page", "0")
                        .param("size", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalElements").value(1))
                .andExpect(jsonPath("$.content[0].email")
                        .value("demo@example.com"));
    }
}
