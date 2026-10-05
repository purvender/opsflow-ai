import { apiClient } from "./client";

export type TenantStatus = "ACTIVE" | "SUSPENDED" | "DELETED";

export type Tenant = {
  id: string;
  name: string;
  slug: string;
  status: TenantStatus;
  createdAt: string;
  updatedAt: string;
};

export async function createTenant(input: {
  name: string;
  slug: string;
}): Promise<Tenant> {
  return apiClient<Tenant>("/api/v1/tenants", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function getTenantById(id: string): Promise<Tenant> {
  return apiClient<Tenant>(`/api/v1/tenants/${id}`);
}
