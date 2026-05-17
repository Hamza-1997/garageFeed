import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';

export interface Update {
  id: string;
  projectId: string;
  title: string;
  text: string;
  fileUrl?: string;
  images?: string[];
  cost?: string;
  createdAt: string;
  isToday?: boolean;
}

export function useProjectUpdates(projectId: string) {
  return useQuery({
    queryKey: ['updates', projectId],
    queryFn: async () => {
      const response = await api.get(`/api/jobs/${projectId}`);
      const job = response.data.data;
      if (!job || !job.updates) return [];
      
      return job.updates.map((u: any) => ({
        id: u.id,
        projectId: u.jobId,
        title: u.title,
        text: u.message,
        fileUrl: u.mediaUrl || undefined,
        cost: u.costLogged ? `$${parseFloat(u.costLogged).toFixed(2)}` : undefined,
        createdAt: u.createdAt,
      })) as Update[];
    },
    enabled: !!projectId,
  });
}

export function useAddUpdate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newUpdate: any) => {
      const payload = {
        title: newUpdate.title,
        message: newUpdate.text,
        mediaUrl: newUpdate.fileUrl,
        costLogged: newUpdate.cost ? newUpdate.cost.replace(/[^0-9.]/g, '') : undefined,
      };
      const response = await api.post(`/api/jobs/${newUpdate.projectId}/updates`, payload);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['updates', variables.projectId] });
      queryClient.invalidateQueries({ queryKey: ['project', variables.projectId] });
    },
  });
}
