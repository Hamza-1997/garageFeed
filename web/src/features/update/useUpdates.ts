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
      return [
        { 
          id: '101', 
          projectId, 
          title: 'Block Degreasing & Initial Inspection',
          text: 'Engine block has been fully stripped and hot-tanked. Magnetic particle inspection (Magnaflux) confirmed zero stress fractures on the main webbing. Proceeding with bore measurements.',
          images: [
            // 'https://images.unsplash.com/photo-1627063162125-96263f9185a5?auto=format&fit=crop&q=80&w=400',
            'https://images.pexels.com/photos/190538/pexels-photo-190538.jpeg?auto=format&fit=crop&q=80&w=400'
          ],
          createdAt: new Date().toISOString(),
          isToday: true
        },
        { 
          id: '102', 
          projectId, 
          title: 'Parts Acquisition: Holley EFI Kit',
          text: 'Received the Holley Terminator X Stealth system. Kit was inventoried and matched against the build sheet. Staging for Phase 3 integration.',
          cost: '$2,450.00',
          createdAt: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
          isToday: false
        },
        { 
          id: '103', 
          projectId, 
          title: 'Chassis Sandblasting Completed',
          text: 'Frame has been taken back to bare metal. Minimal corrosion found on the rear torque boxes. Minor welding required to reinforce the driver-side body mount.',
          createdAt: new Date(Date.now() - 72 * 3600 * 1000).toISOString(),
          isToday: false
        }
      ] as Update[];
    },
    enabled: !!projectId,
  });
}

export function useAddUpdate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newUpdate: Omit<Update, 'id' | 'createdAt'>) => {
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
