import { mockNotifications } from "@/lib/mock/data";

export default function NotificationsPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Notifications</h1>
      <p className="mt-2 text-sm text-slate-600">Demo data only.</p>
      <ul className="mt-6 space-y-3">
        {mockNotifications.map((notification) => (
          <li
            key={notification.id}
            className="flex items-center justify-between rounded border bg-white p-4"
          >
            <span>{notification.title}</span>
            {!notification.read && (
              <span className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-800">
                Unread (mock)
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
