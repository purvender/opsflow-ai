import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 p-6">
      <div className="w-full max-w-md rounded-lg border bg-white p-8">
        <h1 className="text-2xl font-semibold">OpsFlow AI</h1>
        <p className="mt-2 text-sm text-slate-600">
          Authentication will be connected to Core on Day 4.
        </p>
        <Link
          href="/dashboard"
          className="mt-6 inline-block rounded bg-blue-700 px-4 py-2 text-white"
        >
          Continue to frontend demo
        </Link>
      </div>
    </main>
  );
}
