import { AddUpdateForm } from '@/features/update/AddUpdateForm';

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  
  return (
    <div className="py-6 space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-2">Project Details</h1>
        {/* Placeholder for project details and update feed */}
      </div>

      <div>
        <h2 className="text-xl font-bold tracking-tight mb-4">Add Update</h2>
        <AddUpdateForm projectId={resolvedParams.id} />
      </div>
    </div>
  );
}
