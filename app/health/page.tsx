export default function HealthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="text-center">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-2xl font-semibold text-green-700">OK</h1>
        <p className="text-green-600 mt-1 text-sm">Service is running</p>
      </div>
    </div>
  );
}
