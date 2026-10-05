import { beforeEach, describe, expect, it, vi } from "vitest";
import { ApiError } from "./client";
import { createUser, listUsers } from "./users";

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

describe("users api", () => {
  it("creates a user and returns the response", async () => {
    const user = {
      id: "u-1",
      email: "demo@example.com",
      firstName: "Demo",
      lastName: "User",
      status: "ACTIVE",
    };
    const fetchMock = vi.fn(async () => jsonResponse(user, 200));
    vi.stubGlobal("fetch", fetchMock);

    await expect(
      createUser({
        email: "demo@example.com",
        password: "password123",
        firstName: "Demo",
        lastName: "User",
      }),
    ).resolves.toEqual(user);

    const [url, init] = fetchMock.mock.calls[0] as unknown as [
      string,
      RequestInit,
    ];
    expect(url).toBe("http://core-test/api/v1/users");
    expect(init.method).toBe("POST");
  });

  it("throws ApiError with 409 for a duplicate email", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => jsonResponse({}, 409)));

    const error = await createUser({
      email: "demo@example.com",
      password: "password123",
      firstName: "Demo",
      lastName: "User",
    }).catch((err) => err);
    expect(error).toBeInstanceOf(ApiError);
    expect((error as ApiError).status).toBe(409);
  });

  it("lists users with page and size params", async () => {
    const page = {
      content: [],
      page: 0,
      size: 10,
      totalElements: 0,
      totalPages: 0,
      first: true,
      last: true,
    };
    const fetchMock = vi.fn(async () => jsonResponse(page, 200));
    vi.stubGlobal("fetch", fetchMock);

    await expect(listUsers({ page: 0, size: 10 })).resolves.toEqual(page);
    expect((fetchMock.mock.calls[0] as unknown as [string])[0]).toBe(
      "http://core-test/api/v1/users?page=0&size=10",
    );
  });
});
