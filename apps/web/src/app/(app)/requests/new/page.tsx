import { RequestForm } from "@/components/request-form";

export default function NewRequestPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="mb-2 text-2xl font-semibold">New request</h1>
      <p className="mb-6 text-sm text-slate-600">
        Day 2 demo: validation works; saving to Core comes later.
      </p>
      <RequestForm />
    </div>
  );
}
