import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';

export interface Update {
  id: string;
  projectId: string;
  text: string;
  fileUrl?: string;
  createdAt: string;
}

export function useProjectUpdates(projectId: string) {
  return useQuery({
    queryKey: ['updates', projectId],
    queryFn: async () => {
      // const response = await api.get(`/projects/${projectId}/updates`);
      // return response.data;
      return [
        { id: '101', projectId, text: 'Initial teardown complete. Ready for new parts.', createdAt: new Date().toISOString() },
      ] as Update[];
    },
    enabled: !!projectId,
  });
}

export function useAddUpdate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newUpdate: Omit<Update, 'id' | 'createdAt'>) => {
      // const response = await api.post(`/projects/${newUpdate.projectId}/updates`, newUpdate);
      // return response.data;
      console.log('Update added:', newUpdate);
      return {
        ...newUpdate,
        id: Math.random().toString(36).substring(7),
        createdAt: new Date().toISOString(),
      } as Update;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['updates', variables.projectId] });
    },
  });
}
