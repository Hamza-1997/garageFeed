import { AddUpdateForm } from '@/features/update/AddUpdateForm';

export default async function UpdateProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  
  return (
    <div className="min-h-screen">
      <AddUpdateForm projectId={resolvedParams.id} />
    </div>
  );
}
