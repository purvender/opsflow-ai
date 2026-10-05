package com.opsflow.core.api;

import com.opsflow.core.application.TenantService;
import com.opsflow.core.domain.tenant.TenantStatus;
import com.opsflow.core.dto.tenant.TenantResponse;
import com.opsflow.core.error.DuplicateResourceException;
import com.opsflow.core.error.ResourceNotFoundException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.Instant;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(TenantController.class)
class TenantControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private TenantService tenantService;

    @Test
    void createReturns201ForValidRequest() throws Exception {
        TenantResponse response = new TenantResponse(
                UUID.randomUUID(), "Acme", "acme", TenantStatus.ACTIVE,
                Instant.now(), Instant.now());
        when(tenantService.create(any())).thenReturn(response);

        mockMvc.perform(post("/api/v1/tenants")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\":\"Acme\",\"slug\":\"acme\"}"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.slug").value("acme"))
                .andExpect(jsonPath("$.name").value("Acme"));
    }

    @Test
    void createReturns400ForInvalidRequest() throws Exception {
        mockMvc.perform(post("/api/v1/tenants")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\":\"\",\"slug\":\"\"}"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value("VALIDATION_ERROR"));
    }

    @Test
    void createReturns409ForDuplicateSlug() throws Exception {
        when(tenantService.create(any())).thenThrow(
                new DuplicateResourceException("Tenant slug already exists: acme"));

        mockMvc.perform(post("/api/v1/tenants")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\":\"Acme\",\"slug\":\"acme\"}"))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.code").value("DUPLICATE_RESOURCE"));
    }

    @Test
    void getByIdReturns200ForKnownTenant() throws Exception {
        UUID id = UUID.randomUUID();
        when(tenantService.getById(id)).thenReturn(new TenantResponse(
                id, "Acme", "acme", TenantStatus.ACTIVE,
                Instant.now(), Instant.now()));

        mockMvc.perform(get("/api/v1/tenants/{id}", id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(id.toString()));
    }

    @Test
    void getByIdReturns404ForUnknownTenant() throws Exception {
        UUID id = UUID.randomUUID();
        when(tenantService.getById(id)).thenThrow(
                new ResourceNotFoundException("Tenant not found: " + id));

        mockMvc.perform(get("/api/v1/tenants/{id}", id))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.code").value("RESOURCE_NOT_FOUND"));
    }
}
