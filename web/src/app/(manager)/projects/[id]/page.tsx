'use client';

import { use } from 'react';
import { useProject } from '@/features/project/useProjects';
import { useProjectUpdates } from '@/features/update/useUpdates';
import { User, Phone, Mail, Link as LinkIcon, Receipt, Plus } from 'lucide-react';
import Link from 'next/link';
import { ImageCarousel } from '@/components/ui/ImageCarousel';

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const { data: project } = useProject(resolvedParams.id);
  const { data: updates, isLoading } = useProjectUpdates(resolvedParams.id);

  if (!project) return <div className="p-8 text-zinc-400">Loading project...</div>;

  return (
    <div className="pb-[120px] pt-1">
      
      {/* Project Card */}
      <div className="bg-[#1c1c1e] relative overflow-hidden flex flex-col mb-4 shadow-lg rounded-sm border border-[#2a2a2c]">
        
        {project.imageUrl && (
          <div className="w-full h-48 relative">
            <img src={project.imageUrl} alt={project.name} className="w-full h-full object-cover opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c1e] via-[#1c1c1e]/60 to-transparent" />
          </div>
        )}

        <div className={`p-6 relative z-10 flex flex-col flex-1 ${project.imageUrl ? '-mt-24' : ''}`}>
          {/* Faded car icon backdrop */}
          {!project.imageUrl && (
            <div className="absolute right-[-10px] top-4 text-zinc-800/40">
              <svg xmlns="http://www.w3.org/2000/svg" width="140" height="140" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H12c-.6 0-1.2.3-1.6.8L8.3 10S5.6 10.6 3.8 11.1C3.1 11.3 2.5 12 2.5 12.9V16c0 .6.4 1 1 1h2c0 1.7 1.3 3 3 3s3-1.3 3-3h5c0 1.7 1.3 3 3 3s3-1.3 3-3z"/></svg>
            </div>
          )}

          <div className="flex items-center gap-4 mb-4 relative z-10 w-fit">
            <div className="bg-[#ffcc00] text-black px-2 py-0.5 rounded-[2px] text-[8px] font-black uppercase tracking-widest shadow-[0_0_8px_rgba(255,204,0,0.4)]">
              {project.status.replace('_', ' ')}
            </div>
            <span className="text-zinc-400 font-mono text-[9px] uppercase tracking-widest drop-shadow-md">
              JOB_ID: #{resolvedParams.id}21-X
            </span>
          </div>

          <h1 className="text-3xl font-bold text-[#ffbfa3] mb-3 tracking-tight relative z-10 leading-[1.1] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {project.name.toUpperCase()}
          </h1>
          <p className="text-[10px] text-zinc-300 font-bold tracking-[0.15em] leading-[1.6] uppercase mb-8 max-w-[80%] relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            COMPLETE ENGINE OVERHAUL & FRAME RESTORATION
          </p>

          <div className="grid grid-cols-2 gap-4 mt-auto relative z-10">
            <div className="flex flex-col">
              <span className="text-zinc-400 text-[8px] uppercase font-bold tracking-[0.2em] mb-1.5 drop-shadow-md">VIN Reference</span>
              <span className="text-white text-xs font-mono uppercase drop-shadow-md">124379N500001</span>
            </div>
            <div className="flex flex-col">
              <span className="text-zinc-400 text-[8px] uppercase font-bold tracking-[0.2em] mb-1.5 drop-shadow-md">Est. Completion</span>
              <span className="text-white text-xs font-mono uppercase drop-shadow-md">OCT 24, 2023</span>
            </div>
          </div>
        </div>
      </div>

      {/* Client Representative */}
      <div className="bg-[#1c1c1e] p-5 relative flex flex-col mb-8 shadow-lg rounded-sm border border-[#2a2a2c]">
        <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#ffbfa3]"></div>
        
        <h3 className="text-[#ffbfa3] text-[9px] font-bold tracking-[0.2em] uppercase mb-5 pl-1">Client Representative</h3>
        
        <div className="flex items-center gap-4 mb-5 pl-1">
          <div className="w-10 h-10 bg-zinc-800 rounded-sm flex items-center justify-center">
            <User className="w-5 h-5 text-[#ffbfa3]" />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold text-sm">{project.client}</span>
            <span className="text-zinc-400 text-[10px]">Private Collector</span>
          </div>
        </div>

        <div className="pl-1 space-y-3">
          <div className="flex items-center gap-4 text-zinc-400 text-xs">
            <Phone className="w-3.5 h-3.5" />
            <span>+1 (555) 902-1142</span>
          </div>
          <div className="flex items-center gap-4 text-zinc-400 text-xs">
            <Mail className="w-3.5 h-3.5" />
            <span>m.sterling@vintage.com</span>
          </div>
        </div>
      </div>

      {/* Build Log */}
      <div className="mb-2">
        <div className="flex justify-between items-end border-b border-zinc-800 pb-3 mb-6">
          <h2 className="text-xl font-black text-white tracking-widest uppercase">Build_Log</h2>
          <span className="text-zinc-500 text-[9px] font-bold tracking-[0.15em] uppercase mb-1">
            {updates?.length || 0} Total Updates
          </span>
        </div>

        {isLoading ? (
          <div className="text-center py-6 text-zinc-500">Loading timeline...</div>
        ) : (
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-[7px] top-3 bottom-0 w-[2px] bg-zinc-900 rounded-full"></div>
            
            <div className="space-y-0">
              {updates?.map((update, idx) => (
                <div key={update.id} className="relative pl-7 pb-10">
                  {/* Indicator Dot */}
                  <div className={`absolute left-[3px] top-0 w-[10px] h-[10px] rounded-[2px] shadow-sm z-10 ${update.isToday ? 'bg-[#ffbfa3] shadow-[#ffbfa3]/30' : 'bg-zinc-700'}`}></div>
                  
                  {/* Date/Time Header */}
                  <div className="flex flex-col mb-3 -mt-1">
                    <span className="text-white text-[10px] uppercase font-bold tracking-widest">
                      {update.isToday ? 'TODAY' : new Date(update.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
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

                  {/* Instagram-style Swipe Carousel */}
                  {update.images && update.images.length > 0 && (
                    <ImageCarousel images={update.images} />
                  )}

                  {/* Cost Block */}
                  {update.cost && (
                    <div className="bg-[#101011] border border-zinc-800/50 p-4 rounded-sm flex items-center gap-4 w-fit pr-8 mt-2">
                      <Receipt className="w-5 h-5 text-[#ffcc00]" />
                      <span className="text-zinc-300 text-[9px] uppercase font-bold tracking-[0.15em]">
                        Cost Logged: <span className="text-white text-xs ml-1">{update.cost}</span>
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions Panel */}
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-full max-w-[448px] px-4 z-40">
        <div className="bg-[#1c1c1e] rounded-sm shadow-2xl border border-zinc-800/80 p-5 w-full flex flex-col">
          <div className="flex items-center gap-2 mb-5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffbfa3" className="w-4 h-4">
              <path d="M11.5 21.5l1.5-9.5h-5l10.5-11.5-1.5 9.5h5l-10.5 11.5z" />
            </svg>
            <span className="text-white text-[10px] font-bold tracking-[0.25em] uppercase">Quick_Actions</span>
          </div>

          <div className="grid grid-cols-3 gap-2 h-[52px]">
            <button className="bg-[#313133] hover:bg-zinc-700 transition-colors rounded-sm flex flex-col items-center justify-center gap-1.5 border border-zinc-700">
              <LinkIcon className="w-3.5 h-3.5 text-zinc-300" />
              <span className="text-zinc-300 text-[8px] font-bold tracking-widest uppercase">Copy<br/>Link</span>
            </button>
            <button className="bg-[#2b4c59] hover:brightness-110 transition-colors rounded-sm flex flex-col items-center justify-center gap-1.5 shadow-inner">
              <Receipt className="w-3.5 h-3.5 text-[#93c5d6]" />
              <span className="text-[#93c5d6] text-[8px] font-bold tracking-widest uppercase">Log<br/>Cost</span>
            </button>
            <Link href={`/projects/${resolvedParams.id}/update`} className="bg-[#ffbfa3] hover:brightness-110 transition-colors rounded-sm flex flex-col items-center justify-center gap-1.5 shadow-lg shadow-[#ffbfa3]/20">
              <Plus className="w-3.5 h-3.5 text-black stroke-[3]" />
              <span className="text-black text-[8px] font-bold tracking-widest uppercase">Add<br/>Update</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
