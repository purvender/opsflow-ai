export default function DocumentsPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Documents</h1>
      <p className="mt-2 text-sm text-slate-600">Demo document metadata only.</p>
      <div className="mt-6 rounded border bg-white p-4">
        <p className="font-medium">Sample policy (mock citation)</p>
        <p className="text-sm text-slate-500">DEMO-DOC-1 · page 1</p>
      </div>
      <p className="mt-4 text-sm text-slate-600">Upload arrives on Day 18.</p>
      <input
        type="file"
        aria-label="Select a file (demo only, does not upload)"
        className="mt-2"
      />
    </div>
  );
}
