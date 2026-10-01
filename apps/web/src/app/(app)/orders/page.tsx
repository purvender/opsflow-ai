import { mockOrders } from "@/lib/mock/data";

export default function OrdersPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Orders</h1>
      <p className="mt-2 text-sm text-slate-600">Demo data only.</p>
      <table className="mt-6 w-full rounded border bg-white text-left text-sm">
        <thead>
          <tr className="border-b">
            <th className="p-3">ID</th>
            <th className="p-3">Customer</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {mockOrders.map((order) => (
            <tr key={order.id} className="border-b last:border-0">
              <td className="p-3">{order.id}</td>
              <td className="p-3">{order.customer}</td>
              <td className="p-3">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
