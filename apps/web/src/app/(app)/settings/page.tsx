export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Settings</h1>
      <p className="mt-2 text-sm text-slate-600">
        Demo preferences only. Toggles are not persisted.
      </p>
      <div className="mt-6 space-y-3">
        <label className="flex items-center gap-2 rounded border bg-white p-4">
          <input type="checkbox" aria-label="Email updates (not persisted)" />
          Email updates (not persisted)
        </label>
        <label className="flex items-center gap-2 rounded border bg-white p-4">
          <input type="checkbox" aria-label="Compact view (not persisted)" />
          Compact view (not persisted)
        </label>
      </div>
    </div>
  );
}
