import { beforeEach, describe, expect, it, vi } from "vitest";
import { ApiError } from "./client";
import { createTenant, getTenantById } from "./tenants";

process.env.NEXT_PUBLIC_CORE_API_URL = "http://core-test";

function jsonResponse(body: unknown, status: number) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  } as Response;
}

beforeEach(() => {
  vi.unstubAllGlobals();
});

describe("tenants api", () => {
  it("creates a tenant and returns the response", async () => {
    const tenant = {
      id: "t-1",
      name: "Acme",
      slug: "acme",
      status: "ACTIVE",
      createdAt: "2026-10-05T00:00:00Z",
      updatedAt: "2026-10-05T00:00:00Z",
    };
    const fetchMock = vi.fn(async () => jsonResponse(tenant, 201));
    vi.stubGlobal("fetch", fetchMock);

    await expect(createTenant({ name: "Acme", slug: "acme" })).resolves
      .toEqual(tenant);
    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, init] = fetchMock.mock.calls[0] as unknown as [
      string,
      RequestInit,
    ];
    expect(url).toBe("http://core-test/api/v1/tenants");
    expect(init.method).toBe("POST");
    expect(init.body).toBe(JSON.stringify({ name: "Acme", slug: "acme" }));
  });

  it("throws ApiError with 409 for a duplicate slug", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => jsonResponse({}, 409)));

    const error = await createTenant({ name: "Acme", slug: "acme" }).catch(
      (err) => err,
    );
    expect(error).toBeInstanceOf(ApiError);
    expect((error as ApiError).status).toBe(409);
  });

  it("fetches a tenant by id", async () => {
    const tenant = { id: "t-1", name: "Acme", slug: "acme" };
    const fetchMock = vi.fn(async () => jsonResponse(tenant, 200));
    vi.stubGlobal("fetch", fetchMock);

    await expect(getTenantById("t-1")).resolves.toEqual(tenant);
    expect((fetchMock.mock.calls[0] as unknown as [string])[0]).toBe(
      "http://core-test/api/v1/tenants/t-1",
    );
  });
});
