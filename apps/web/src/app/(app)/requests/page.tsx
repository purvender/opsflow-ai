import Link from "next/link";
import { RequestList } from "@/components/request-list";
import { mockRequests } from "@/lib/mock/data";

export default function RequestsPage() {
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Requests</h1>
        <Link href="/requests/new" className="text-blue-700 hover:underline">
          New request
        </Link>
      </div>
      <RequestList requests={mockRequests} />
    </>
  );
}
