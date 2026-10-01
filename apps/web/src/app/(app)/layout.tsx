import { AppNavigation } from "@/components/app-navigation";

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 lg:flex">
      <AppNavigation />
      <div className="min-w-0 flex-1">
        <header className="border-b bg-white px-6 py-4">
          <span className="font-semibold">OpsFlow AI</span>
          <span className="ml-3 text-sm text-slate-500">Frontend demo</span>
        </header>
        <main className="mx-auto max-w-7xl p-6">{children}</main>
      </div>
    </div>
  );
}
