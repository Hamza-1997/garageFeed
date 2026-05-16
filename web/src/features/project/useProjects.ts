import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';

export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  status: 'IN ASSEMBLY' | 'WAITING FOR PARTS' | 'METAL WORK' | 'QC DELAYED';
  client: string;
  imageUrl: string;
}

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const response = await api.get('/api/jobs');
      const jobs = response.data.data;
      
      return jobs.map((job: any) => ({
        id: job.id,
        name: job.projectTitle,
        description: job.workRequired || '',
        createdAt: job.createdAt,
        status: job.status.replace(/_/g, ' '),
        client: job.clientName,
        imageUrl: job.imageUrl || ''
      })) as Project[];
    },
  });
}

export function useProject(id: string) {
  const { data: projects, isLoading, isError } = useProjects();
  return {
    data: projects?.find(p => p.id === id) || projects?.[3] || projects?.[0], // Focus on Camaro for styling mock if wrong ID given
    isLoading,
    isError
  };
}

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newProject: any) => {
      const response = await api.post('/api/jobs', newProject);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}
