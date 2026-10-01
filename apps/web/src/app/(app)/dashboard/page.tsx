import Link from "next/link";
import { mockRequests } from "@/lib/mock/data";

export default function DashboardPage() {
  const pending = mockRequests.filter(
    (request) =>
      request.status === "SUBMITTED" ||
      request.status === "UNDER_REVIEW",
  ).length;

  return (
    <div>
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="mt-2 text-slate-600">Demo workspace using mock data.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded border bg-white p-5">
          Total requests: {mockRequests.length}
        </div>
        <div className="rounded border bg-white p-5">
          Pending review: {pending}
        </div>
      </div>
      <Link href="/requests" className="mt-6 inline-block text-blue-700">
        View requests
      </Link>
    </div>
  );
}
