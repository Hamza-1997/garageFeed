export default async function TrackPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const resolvedParams = await params;
  
  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold tracking-tight mb-4">Client Dashboard</h1>
      <p>Tracking project with token: {resolvedParams.token}</p>
      {/* Read-only client view will go here */}
    </div>
  );
}
