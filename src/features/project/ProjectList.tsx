'use client';

import { useProjects } from './useProjects';
import Link from 'next/link';
import { Plus } from 'lucide-react';

function getStatusColor(status: string) {
  switch (status) {
    case 'IN ASSEMBLY':
      return 'bg-[#7a0d00] text-[#ff8f73]'; // Red background, lighter text
    case 'WAITING FOR PARTS':
      return 'bg-[#4d3d00] text-[#ffc824]'; // Yellow background
    case 'METAL WORK':
      return 'bg-[#2b4c59] text-[#93c5d6]'; // Blue-ish background
    case 'QC DELAYED':
      return 'bg-[#990f02] text-[#ffb6b6]'; // Solid brighter red
    default:
      return 'bg-zinc-800 text-zinc-300';
  }
}

export function ProjectList() {
  const { data: projects, isLoading, isError } = useProjects();

  if (isLoading) return <div className="text-center py-8 text-zinc-500 animate-pulse">Loading active jobs...</div>;
  if (isError) return <div className="text-center py-8 text-red-500">Failed to load projects.</div>;

  return (
    <div className="space-y-6 pb-6 pt-2">
      <div className="flex flex-col mb-8">
        <h3 className="text-[#d4a373] text-[10px] font-bold tracking-[0.2em] uppercase mb-1">
          Manager Dashboard
        </h3>
        <h2 className="text-[34px] font-bold tracking-tight text-white leading-none">
          Active Jobs
        </h2>
      </div>

      <div className="flex items-center mb-8">
        <div className="flex flex-col border-l-[3px] border-[#f08c5c] pl-3">
          <span className="text-zinc-500 text-[9px] uppercase font-bold tracking-[0.2em] mb-1">Capacity</span>
          <span className="text-white text-2xl font-bold leading-none">14 <span className="text-zinc-400 text-lg">/ 20</span></span>
        </div>
      </div>

      <div className="grid gap-6">
        {projects?.map((project) => (
          <div key={project.id} className="bg-[#1c1c1e] rounded-sm overflow-hidden flex flex-col group cursor-pointer transition-colors shadow-2xl relative">
            {project.imageUrl && (
              <div className="h-48 overflow-hidden relative w-full bg-black">
                <img 
                  src={project.imageUrl} 
                  alt={project.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[600ms] opacity-90" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c1e] via-transparent to-transparent opacity-60"></div>
              </div>
            )}
            
            <div className={`p-5 flex flex-col relative z-10 bg-[#1c1c1e] ${project.imageUrl ? '-mt-2' : ''}`}>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{project.name}</h3>
              
              {/* Status Badge */}
              <div className={`text-[9px] font-bold uppercase tracking-[0.15em] px-3 py-1 mb-5 w-fit rounded-sm shadow-sm ${getStatusColor(project.status)}`}>
                {project.status.replace('_', ' ')}
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-auto">
                <div className="flex flex-col">
                  <span className="text-zinc-500 text-[8px] uppercase font-bold tracking-widest mb-1.5">Client</span>
                  <span className="text-zinc-300 text-[13px]">{project.client}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-zinc-500 text-[8px] uppercase font-bold tracking-widest mb-1.5">Arrival</span>
                  <span className="text-zinc-300 text-[13px]">
                    {new Date(project.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Action Button */}
      <Link href="/projects/new" className="fixed bottom-28 right-5 sm:right-[calc(50%-210px)] w-14 h-14 bg-[#ffc3a0] text-[#111] rounded-lg shadow-xl flex items-center justify-center hover:bg-white hover:-translate-y-1 transition-all z-40 group cursor-pointer shadow-[#ffc3a0]/20">
        <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300 stroke-[2.5]" />
      </Link>
    </div>
  );
}
