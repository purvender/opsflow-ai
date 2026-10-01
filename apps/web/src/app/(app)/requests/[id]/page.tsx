import { notFound } from "next/navigation";
import { mockRequests } from "@/lib/mock/data";

export default async function RequestDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const request = mockRequests.find((item) => item.id === id);

  if (!request) notFound();

  return (
    <article className="max-w-2xl rounded-lg border bg-white p-6">
      <p className="text-sm text-slate-500">{request.id}</p>
      <h1 className="mt-2 text-2xl font-semibold">{request.title}</h1>
      <p className="mt-4">{request.description}</p>
      <p className="mt-4 text-sm">Status: {request.status}</p>
    </article>
  );
}
