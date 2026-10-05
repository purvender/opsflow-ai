import { apiClient } from "./client";

export type UserStatus = "ACTIVE" | "INVITED" | "SUSPENDED" | "DELETED";

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
};

export type UserPage = {
  content: User[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
};

export async function createUser(input: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}): Promise<User> {
  return apiClient<User>("/api/v1/users", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function getUserById(id: string): Promise<User> {
  return apiClient<User>(`/api/v1/users/${id}`);
}

export async function listUsers(params: {
  page: number;
  size: number;
}): Promise<UserPage> {
  const query = new URLSearchParams({
    page: String(params.page),
    size: String(params.size),
  });
  return apiClient<UserPage>(`/api/v1/users?${query.toString()}`);
}
