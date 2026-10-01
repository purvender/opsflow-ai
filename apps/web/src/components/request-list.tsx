"use client";

import Link from "next/link";
import { useState } from "react";
import type { OpsRequest, RequestStatus } from "@/types/domain";

export function RequestList({ requests }: { requests: OpsRequest[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"ALL" | RequestStatus>("ALL");

  const visible = requests.filter((request) => {
    const matchesText = request.title
      .toLowerCase()
      .includes(query.toLowerCase());

    return matchesText && (status === "ALL" || request.status === status);
  });

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <input
          aria-label="Search requests"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by title"
          className="rounded border bg-white p-2"
        />
        <select
          aria-label="Filter by status"
          value={status}
          onChange={(event) =>
            setStatus(event.target.value as "ALL" | RequestStatus)
          }
          className="rounded border bg-white p-2"
        >
          <option value="ALL">All statuses</option>
          <option value="DRAFT">Draft</option>
          <option value="SUBMITTED">Submitted</option>
          <option value="UNDER_REVIEW">Under review</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>

      {visible.length === 0 ? (
        <p>No matching requests.</p>
      ) : (
        <ul className="divide-y rounded-lg border bg-white">
          {visible.map((request) => (
            <li key={request.id} className="p-4">
              <Link
                href={`/requests/${request.id}`}
                className="font-medium text-blue-700 hover:underline"
              >
                {request.title}
              </Link>
              <p className="mt-1 text-sm text-slate-500">
                {request.id} · {request.status.replaceAll("_", " ")}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
