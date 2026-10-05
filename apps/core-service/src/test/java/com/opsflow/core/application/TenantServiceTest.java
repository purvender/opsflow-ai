package com.opsflow.core.application;

import com.opsflow.core.domain.tenant.Tenant;
import com.opsflow.core.domain.tenant.TenantRepository;
import com.opsflow.core.domain.tenant.TenantStatus;
import com.opsflow.core.dto.tenant.CreateTenantRequest;
import com.opsflow.core.dto.tenant.TenantResponse;
import com.opsflow.core.error.DuplicateResourceException;
import com.opsflow.core.error.ResourceNotFoundException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class TenantServiceTest {

    @Mock
    private TenantRepository tenantRepository;

    @InjectMocks
    private TenantService tenantService;

    @Test
    void createSavesTenantWhenSlugIsNew() {
        when(tenantRepository.existsBySlugIgnoreCase("acme")).thenReturn(false);
        when(tenantRepository.save(any(Tenant.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        TenantResponse response =
                tenantService.create(new CreateTenantRequest("Acme", "Acme"));

        assertThat(response.name()).isEqualTo("Acme");
        assertThat(response.slug()).isEqualTo("acme");
        assertThat(response.status()).isEqualTo(TenantStatus.ACTIVE);
        verify(tenantRepository).save(any(Tenant.class));
    }

    @Test
    void createRejectsDuplicateSlug() {
        when(tenantRepository.existsBySlugIgnoreCase("acme")).thenReturn(true);

        assertThatThrownBy(() ->
                tenantService.create(new CreateTenantRequest("Acme", "acme")))
                .isInstanceOf(DuplicateResourceException.class);
    }

    @Test
    void getByIdReturnsTenantWhenItExists() {
        UUID id = UUID.randomUUID();
        when(tenantRepository.findById(id))
                .thenReturn(Optional.of(new Tenant("Acme", "acme")));

        TenantResponse response = tenantService.getById(id);

        assertThat(response.name()).isEqualTo("Acme");
        assertThat(response.slug()).isEqualTo("acme");
    }

    @Test
    void getByIdThrowsWhenTenantIsMissing() {
        UUID id = UUID.randomUUID();
        when(tenantRepository.findById(id)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> tenantService.getById(id))
                .isInstanceOf(ResourceNotFoundException.class);
    }
}
