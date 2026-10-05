"use client";

import { useEffect, useState } from "react";
import { ApiError } from "@/lib/api/client";
import {
  createUser,
  listUsers,
  type User,
  type UserPage,
} from "@/lib/api/users";

const PAGE_SIZE = 10;

function errorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    if (error.status === 409) return "This email is already registered.";
    if (error.status === 400) return "Check email format and password length.";
  }
  return error instanceof Error ? error.message : "Request failed";
}

export default function UsersPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [created, setCreated] = useState<User | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [page, setPage] = useState(0);
  const [usersPage, setUsersPage] = useState<UserPage | null>(null);
  const [listError, setListError] = useState<string | null>(null);

  async function load(targetPage: number) {
    setListError(null);
    try {
      setUsersPage(await listUsers({ page: targetPage, size: PAGE_SIZE }));
      setPage(targetPage);
    } catch (err) {
      setListError(errorMessage(err));
    }
  }

  useEffect(() => {
    load(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setFormError(null);
    setCreated(null);

    try {
      const user = await createUser({ email, password, firstName, lastName });
      setCreated(user);
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
      await load(0);
    } catch (err) {
      setFormError(errorMessage(err));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-semibold">Users</h1>
      <p className="mt-2 text-sm text-slate-600">
        Connected to Core Service. Email must be unique.
      </p>

      <form onSubmit={submit} className="mt-6 space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="block font-medium">
              First name
            </label>
            <input
              id="firstName"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              className="mt-1 w-full rounded border p-2"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block font-medium">
              Last name
            </label>
            <input
              id="lastName"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              className="mt-1 w-full rounded border p-2"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-1 w-full rounded border p-2"
          />
        </div>

        <div>
          <label htmlFor="password" className="block font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-1 w-full rounded border p-2"
          />
        </div>

        <button
          disabled={saving}
          className="rounded bg-blue-700 px-4 py-2 text-white disabled:opacity-50"
        >
          {saving ? "Saving..." : "Create user"}
        </button>
      </form>

      {formError && (
        <p role="alert" className="mt-4 text-sm text-red-700">
          {formError}
        </p>
      )}

      {created && (
        <div role="status" className="mt-4 rounded border bg-green-50 p-4">
          <p className="font-medium">User created</p>
          <p className="text-sm">
            {created.email} · {created.id}
          </p>
        </div>
      )}

      <h2 className="mt-10 text-xl font-semibold">Users list</h2>

      {listError && (
        <p role="alert" className="mt-4 text-sm text-red-700">
          {listError}
        </p>
      )}

      {usersPage && (
        <>
          <ul className="mt-4 divide-y rounded-lg border bg-white">
            {usersPage.content.map((user) => (
              <li key={user.id} className="p-4">
                <p className="font-medium">{user.email}</p>
                <p className="text-sm text-slate-500">
                  {user.firstName} {user.lastName} · {user.status}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex items-center gap-4">
            <button
              disabled={usersPage.first}
              onClick={() => load(page - 1)}
              className="rounded border px-3 py-1 text-sm disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm text-slate-600">
              Page {usersPage.page + 1} of {usersPage.totalPages} (
              {usersPage.totalElements} total)
            </span>
            <button
              disabled={usersPage.last}
              onClick={() => load(page + 1)}
              className="rounded border px-3 py-1 text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
