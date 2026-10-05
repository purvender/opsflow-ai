"use client";

import { useState } from "react";
import { ApiError } from "@/lib/api/client";
import { createTenant, type Tenant } from "@/lib/api/tenants";

function errorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    if (error.status === 409) return "This slug already exists.";
    if (error.status === 400) return "Name and slug are required.";
  }
  return error instanceof Error ? error.message : "Unable to create tenant";
}

export default function TenantsPage() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [created, setCreated] = useState<Tenant | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setCreated(null);

    try {
      setCreated(await createTenant({ name, slug }));
      setName("");
      setSlug("");
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold">Tenants</h1>
      <p className="mt-2 text-sm text-slate-600">
        Connected to Core Service. Slug must be unique.
      </p>

      <form onSubmit={submit} className="mt-6 space-y-5">
        <div>
          <label htmlFor="name" className="block font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-1 w-full rounded border p-2"
          />
        </div>

        <div>
          <label htmlFor="slug" className="block font-medium">
            Slug
          </label>
          <input
            id="slug"
            name="slug"
            value={slug}
            onChange={(event) => setSlug(event.target.value)}
            className="mt-1 w-full rounded border p-2"
            placeholder="acme"
          />
        </div>

        <button
          disabled={saving}
          className="rounded bg-blue-700 px-4 py-2 text-white disabled:opacity-50"
        >
          {saving ? "Saving..." : "Create tenant"}
        </button>
      </form>

      {error && (
        <p role="alert" className="mt-4 text-sm text-red-700">
          {error}
        </p>
      )}

      {created && (
        <div role="status" className="mt-4 rounded border bg-green-50 p-4">
          <p className="font-medium">Tenant created</p>
          <p className="text-sm">
            {created.name} · {created.slug} · {created.id}
          </p>
        </div>
      )}
    </div>
  );
}
