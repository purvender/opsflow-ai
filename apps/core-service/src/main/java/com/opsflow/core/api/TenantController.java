package com.opsflow.core.api;

import com.opsflow.core.application.TenantService;
import com.opsflow.core.dto.tenant.CreateTenantRequest;
import com.opsflow.core.dto.tenant.TenantResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/tenants")
public class TenantController {

    private final TenantService tenantService;

    public TenantController(TenantService tenantService) {
        this.tenantService = tenantService;
    }

    @PostMapping
    public ResponseEntity<TenantResponse> create(
            @Valid @RequestBody CreateTenantRequest request
    ) {
        TenantResponse response = tenantService.create(request);

        return ResponseEntity
                .created(URI.create("/api/v1/tenants/" + response.id()))
                .body(response);
    }

    @GetMapping("/{id}")
    public TenantResponse getById(@PathVariable UUID id) {
        return tenantService.getById(id);
    }
}
