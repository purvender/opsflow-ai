package com.opsflow.core;

import com.opsflow.core.application.TenantService;
import com.opsflow.core.dto.tenant.CreateTenantRequest;
import com.opsflow.core.dto.tenant.TenantResponse;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
class IntegrationTest {

    @Autowired
    private TenantService tenantService;

    @Test
    void createThenGetByIdReturnsMatchingTenant() {
        TenantResponse created = tenantService.create(
                new CreateTenantRequest("Integ Tenant", "integ-tenant"));

        TenantResponse found = tenantService.getById(created.id());

        assertThat(found.id()).isEqualTo(created.id());
        assertThat(found.name()).isEqualTo("Integ Tenant");
        assertThat(found.slug()).isEqualTo("integ-tenant");
    }
}
