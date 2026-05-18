'use client';

import { use } from 'react';
import { useClientJob } from '@/features/project/useProjects';
import { ImageCarousel } from '@/components/ui/ImageCarousel';
import { Receipt } from 'lucide-react';

export default function ClientProjectView({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const resolvedParams = use(params);
  const { data, isLoading, isError } = useClientJob(resolvedParams.token);

  if (isLoading) return <div className="p-8 text-zinc-400 text-center font-mono text-xs uppercase tracking-widest mt-20">Loading Project...</div>;
  if (isError || !data) return <div className="p-8 text-red-400 text-center font-mono text-xs uppercase tracking-widest mt-20">Project Not Found or Link Expired</div>;

  const { project, updates, workshopName } = data;

  return (
    <div className="pb-10 pt-1 min-h-screen bg-black">
      
      {/* Top Banner indicating who is sharing */}
      <div className="flex items-center justify-center p-4 border-b border-zinc-900 mb-4 bg-[#111111]">
        <span className="text-zinc-500 text-[9px] uppercase font-bold tracking-[0.2em]">Shared By <span className="text-white ml-1">{workshopName}</span></span>
      </div>

      {/* Project Card */}
      <div className="bg-[#1c1c1e] mx-4 relative overflow-hidden flex flex-col mb-8 shadow-lg rounded-sm border border-[#2a2a2c]">
        {project.imageUrl && (
          <div className="w-full h-48 relative">
            <img src={project.imageUrl} alt={project.name} className="w-full h-full object-cover opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c1e] via-[#1c1c1e]/60 to-transparent" />
          </div>
        )}

        <div className={`p-6 relative z-10 flex flex-col flex-1 ${project.imageUrl ? '-mt-24' : ''}`}>
          {!project.imageUrl && (
            <div className="absolute right-[-10px] top-4 text-zinc-800/40">
              <svg xmlns="http://www.w3.org/2000/svg" width="140" height="140" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H12c-.6 0-1.2.3-1.6.8L8.3 10S5.6 10.6 3.8 11.1C3.1 11.3 2.5 12 2.5 12.9V16c0 .6.4 1 1 1h2c0 1.7 1.3 3 3 3s3-1.3 3-3h5c0 1.7 1.3 3 3 3s3-1.3 3-3z"/></svg>
            </div>
          )}

          <div className="flex items-center gap-4 mb-4 relative z-10 w-fit">
            <div className="bg-[#ffcc00] text-black px-2 py-0.5 rounded-[2px] text-[8px] font-black uppercase tracking-widest shadow-[0_0_8px_rgba(255,204,0,0.4)]">
              {project.status}
            </div>
            <span className="text-zinc-400 font-mono text-[9px] uppercase tracking-widest drop-shadow-md">
              Client Access
            </span>
          </div>

          <h1 className="text-3xl font-bold text-[#ffbfa3] mb-3 tracking-tight relative z-10 leading-[1.1] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {project.name.toUpperCase()}
          </h1>
          <p className="text-[10px] text-zinc-300 font-bold tracking-[0.15em] leading-[1.6] uppercase mb-4 max-w-[80%] relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            {project.description}
          </p>
        </div>
      </div>

      {/* Build Log */}
      <div className="px-4">
        <div className="flex justify-between items-end border-b border-zinc-800 pb-3 mb-6">
          <h2 className="text-xl font-black text-white tracking-widest uppercase">Project Feed</h2>
          <span className="text-zinc-500 text-[9px] font-bold tracking-[0.15em] uppercase mb-1">
            {updates.length} Updates
          </span>
        </div>

        {updates.length === 0 ? (
          <div className="text-center py-6 text-zinc-500 font-mono text-xs tracking-widest uppercase">No updates yet</div>
        ) : (
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-[7px] top-3 bottom-0 w-[2px] bg-zinc-900 rounded-full"></div>
            
            <div className="space-y-0">
              {updates.map((update: any) => {
                const isToday = new Date(update.createdAt).toDateString() === new Date().toDateString();
                return (
                  <div key={update.id} className="relative pl-7 pb-10">
                    {/* Indicator Dot */}
                    <div className={`absolute left-[3px] top-0 w-[10px] h-[10px] rounded-[2px] shadow-sm z-10 ${isToday ? 'bg-[#ffbfa3] shadow-[#ffbfa3]/30' : 'bg-zinc-700'}`}></div>
                    
                    {/* Date/Time Header */}
                    <div className="flex flex-col mb-3 -mt-1">
                      <span className="text-white text-[10px] uppercase font-bold tracking-widest">
                        {isToday ? 'TODAY' : new Date(update.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                      <span className="text-zinc-500 text-[9px] tracking-widest">
                        {new Date(update.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    <h3 className="text-white font-bold text-[15px] leading-snug mb-3 pr-4">
                      {update.title}
                    </h3>
                    
                    <p className="text-zinc-400 text-xs leading-[1.7] mb-4 pr-1">
                      {update.text}
                    </p>

                    {/* Image Carousel */}
                    {update.images && update.images.length > 0 && (
                      <ImageCarousel images={update.images} />
                    )}

                    {/* Cost Block */}
                    {update.cost && (
                      <div className="bg-[#101011] border border-zinc-800/50 p-4 rounded-sm flex items-center gap-4 w-fit pr-8 mt-2">
                        <Receipt className="w-5 h-5 text-[#ffcc00]" />
                        <span className="text-zinc-300 text-[9px] uppercase font-bold tracking-[0.15em]">
                          Cost Added: <span className="text-white text-xs ml-1">{update.cost}</span>
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
