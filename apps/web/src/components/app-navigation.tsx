"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/requests", label: "Requests" },
  { href: "/customers", label: "Customers" },
  { href: "/orders", label: "Orders" },
  { href: "/documents", label: "Documents" },
  { href: "/assistant", label: "AI Assistant" },
  { href: "/notifications", label: "Notifications" },
  { href: "/settings", label: "Settings" },
];

export function AppNavigation() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main navigation"
      className="border-b bg-white p-4 lg:min-h-screen lg:w-60 lg:border-b-0 lg:border-r"
    >
      <p className="mb-5 text-lg font-bold">OpsFlow AI</p>
      <div className="flex gap-1 overflow-x-auto lg:flex-col">
        {links.map(({ href, label }) => {
          const active =
            pathname === href || pathname.startsWith(`${href}/`);

          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm ${
                active
                  ? "bg-blue-100 font-medium text-blue-800"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
