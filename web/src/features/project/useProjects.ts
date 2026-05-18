import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';

export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  status: string;
  client: string;
  imageUrl: string;
  clientToken?: string;
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
        imageUrl: job.imageUrl || '',
        clientToken: job.clientToken,
      })) as Project[];
    },
  });
}

export function useProject(id: string) {
  return useQuery({
    queryKey: ['project', id],
    queryFn: async () => {
      if (!id) return null;
      const response = await api.get(`/api/jobs/${id}`);
      const job = response.data.data;
      if (!job) return null;
      return {
        id: job.id,
        name: job.projectTitle,
        description: job.workRequired || '',
        createdAt: job.createdAt,
        status: job.status.replace(/_/g, ' '),
        client: job.clientName,
        imageUrl: job.imageUrl || '',
        clientToken: job.clientToken,
      } as Project;
    },
    enabled: !!id,
  });
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

export function useClientJob(token: string) {
  return useQuery({
    queryKey: ['clientJob', token],
    queryFn: async () => {
      if (!token) return null;
      const response = await api.get(`/api/client/jobs/${token}`);
      const job = response.data.data;
      if (!job) return null;
      
      const mappedUpdates = job.updates?.map((u: any) => ({
        id: u.id,
        projectId: u.jobId,
        title: u.title,
        text: u.message,
        images: u.mediaUrl ? [u.mediaUrl] : undefined,
        cost: u.costLogged ? `$${parseFloat(u.costLogged).toFixed(2)}` : undefined,
        createdAt: u.createdAt,
      })) || [];

      return {
        project: {
          id: job.id,
          name: job.projectTitle,
          description: job.workRequired || '',
          createdAt: job.createdAt,
          status: job.status.replace(/_/g, ' '),
          client: job.clientName,
          imageUrl: job.imageUrl || '',
        } as Project,
        updates: mappedUpdates,
        workshopName: job.workshop?.name || 'Workshop',
      };
    },
    enabled: !!token,
  });
}
