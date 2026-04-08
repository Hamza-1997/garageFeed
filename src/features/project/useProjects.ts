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
      // Mocking API call for frontend-only
      // const response = await api.get('/projects');
      // return response.data;
      return [
        { 
          id: '1', 
          name: '1967 Mustang Fastback', 
          description: 'Full restoration job.', 
          createdAt: '2023-10-12T00:00:00Z',
          status: 'IN ASSEMBLY',
          client: 'Robert Sterling',
          imageUrl: 'https://images.pexels.com/photos/34067953/pexels-photo-34067953.jpeg?auto=format&fit=crop&q=80&w=800'
        },
        { 
          id: '2', 
          name: 'Jeep FJ40', 
          description: 'Engine rebuild and paint correction.', 
          createdAt: '2023-11-03T00:00:00Z',
          status: 'WAITING FOR PARTS',
          client: 'Elena Rossi',
          imageUrl: 'https://thumbs.dreamstime.com/b/fishermen-fj-oman-toyota-fj-used-fishermen-to-tow-boats-sea-185229373.jpg?auto=format&fit=crop&q=80&w=800'
        },
        { 
          id: '4', 
          name: '1969 Chevy Camaro SS', 
          description: 'Final inspection failed, awaiting rework.', 
          createdAt: '2023-11-10T00:00:00Z',
          status: 'QC DELAYED',
          client: 'William Chen',
          imageUrl: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=800'
        },
               { 
          id: '3', 
          name: 'Land Rover Defender 90', 
          description: 'Rust repair and fabrication.', 
          createdAt: '2023-10-28T00:00:00Z',
          status: 'METAL WORK',
          client: 'James Thorne',
          imageUrl: ''
        },
      ] as Project[];
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
    mutationFn: async (newProject: Omit<Project, 'id' | 'createdAt'>) => {
      // const response = await api.post('/projects', newProject);
      // return response.data;
      console.log('Project created:', newProject);
      return {
        id: Math.random().toString(36).substring(7),
        createdAt: new Date().toISOString(),
        ...newProject,
      } as Project;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}
