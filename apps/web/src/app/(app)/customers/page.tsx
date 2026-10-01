import { mockCustomers } from "@/lib/mock/data";

export default function CustomersPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Customers</h1>
      <p className="mt-2 text-sm text-slate-600">Demo data only.</p>
      <ul className="mt-6 space-y-3">
        {mockCustomers.map((customer) => (
          <li
            key={customer.id}
            className="rounded border bg-white p-4"
          >
            <p className="font-medium">{customer.name}</p>
            <p className="text-sm text-slate-500">
              {customer.id} · {customer.status}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
