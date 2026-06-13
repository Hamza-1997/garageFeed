'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAddUpdate } from './useUpdates';
import { useProject } from '@/features/project/useProjects';
import { Eye, Wand2, Camera, X } from 'lucide-react';
import Link from 'next/link';

import { compressAndUploadImage } from '@/lib/upload';

interface AddUpdateFormProps {
  projectId: string;
}

export function AddUpdateForm({ projectId }: AddUpdateFormProps) {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [cost, setCost] = useState('');
  const [visibility, setVisibility] = useState<'CLIENT' | 'INTERNAL'>('CLIENT');
  const [images, setImages] = useState<{key: string, preview: string}[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const { data: project } = useProject(projectId);
  const addUpdate = useAddUpdate();
  const router = useRouter();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setIsUploading(true);
      try {
        const key = await compressAndUploadImage(file);
        setImages(prev => [...prev, { key, preview }]);
      } catch (error: any) {
        alert(error.message || 'Failed to upload image. Please try again.');
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || (!text.trim() && images.length === 0)) return;

    addUpdate.mutate(
      { 
        projectId, 
        title,
        text: text || 'Uploaded photo update.',
        images: images.length > 0 ? images.map(img => img.key) : undefined,
        cost: cost || undefined,
        visibility
      },
      {
        onSuccess: () => {
          setText('');
          setTitle('');
          setCost('');
          setImages([]);
          router.push(`/projects/${projectId}`);
        },
      }
    );
  };

  const removeImage = (idx: number) => {
    setImages(images.filter((_, i) => i !== idx));
  };

  return (
    <div className="pb-[140px] relative">
      {/* Top action bar overriding normal header partially or just an X */}
      <div className="absolute right-0 top-0 flex justify-end">
        <Link href={`/projects/${projectId}`} className="p-2 -mr-2 -mt-2">
          <X className="w-5 h-5 text-zinc-500 hover:text-white" />
        </Link>
      </div>

      <div className="flex flex-col pt-4 mb-8">
        <span className="text-[#d4a373] text-[9px] font-bold tracking-[0.2em] uppercase mb-4">
          Project {projectId}-X
        </span>
        <h1 className="text-3xl font-bold text-white tracking-tight mb-4 leading-tight">
          Job Progress<br/>Update
        </h1>
        <p className="text-[11px] text-zinc-400 font-medium leading-[1.6]">
          Technical logs for restoration of {project?.name || 'project'}. Ensure precision in reporting for client transparency.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Visibility Card */}
        <div className="bg-[#1c1c1e] p-5 rounded-sm shadow-md border border-[#2a2a2c] flex flex-col pt-6 relative">
          <div className="flex gap-4 mb-6">
            <div className="w-9 h-9 bg-[#2b4c59] flex items-center justify-center rounded-[2px] shrink-0">
              <Eye className="w-4 h-4 text-[#93c5d6]" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-white text-[10px] font-bold uppercase tracking-[0.15em] mb-1">Update Visibility</span>
              <span className="text-zinc-500 text-[10px] leading-tight pr-4">Switch between shared log and internal bench notes</span>
            </div>
          </div>
          
          <div className="flex h-11 bg-black rounded-[2px] p-1 gap-1">
            <button 
              type="button" 
              onClick={() => setVisibility('CLIENT')}
              className={`flex-1 flex items-center justify-center text-[9px] uppercase font-bold tracking-[0.15em] transition-colors rounded-[2px] ${visibility === 'CLIENT' ? 'bg-[#ffbfa3] text-black shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              Client Viewable
            </button>
            <button 
              type="button" 
              onClick={() => setVisibility('INTERNAL')}
              className={`flex-1 flex items-center justify-center text-[9px] uppercase font-bold tracking-[0.15em] transition-colors rounded-[2px] ${visibility === 'INTERNAL' ? 'bg-[#ffbfa3] text-black shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              Internal Note
            </button>
          </div>
        </div>

        {/* Title Input */}
        <div className="flex flex-col mb-2">
          <span className="text-zinc-500 text-[8px] uppercase font-bold tracking-[0.2em] mb-2">Update Title</span>
          <input
            type="text"
            placeholder="e.g. Body paint completed"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full h-12 bg-[#161618] border-none text-[13px] text-zinc-300 px-5 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-700 rounded-sm"
            required
          />
        </div>

        {/* Text Area Card */}
        <div className="flex items-end justify-between mb-2 mt-4">
          <span className="text-zinc-500 text-[8px] uppercase font-bold tracking-[0.2em]">Technical Notes & Progress</span>
          <button type="button" className="bg-[#ffcc00] text-black h-6 px-3 flex items-center gap-1.5 rounded-[2px] shadow-md hover:bg-yellow-400">
            <Wand2 className="w-3 h-3" strokeWidth={3} />
            <span className="text-[8px] font-black tracking-widest uppercase">AI Polish</span>
          </button>
        </div>
        
        <textarea
          placeholder="Detail the assembly steps, component installations, or diagnostic results..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-40 bg-[#161618] border-none text-[13px] text-zinc-300 p-5 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-700 rounded-sm resize-none"
        />

        {/* Cost Input (Optional) */}
        <div className="flex flex-col mt-4 mb-2">
          <span className="text-zinc-500 text-[8px] uppercase font-bold tracking-[0.2em] mb-2">Logged Cost (Optional)</span>
          <input
            type="number"
            step="0.01"
            placeholder="0.00"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            className="w-full h-12 bg-[#161618] border-none text-[13px] text-zinc-300 px-5 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-700 rounded-sm"
          />
        </div>

        {/* Photo Upload Area */}
        <label className={`border border-dashed border-zinc-700 bg-[#161618] flex flex-col items-center justify-center h-48 rounded-[2px] mt-4 transition-colors ${isUploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-zinc-900'}`}>
          <Camera className="w-6 h-6 text-zinc-500 mb-3" />
          <span className="text-zinc-500 text-[9px] uppercase font-bold tracking-widest">{isUploading ? 'Uploading...' : 'Upload Photo'}</span>
          <input 
            type="file" 
            accept="image/jpeg, image/png, image/webp" 
            className="hidden" 
            onChange={handleImageUpload}
            disabled={isUploading}
          />
        </label>

        {/* Mock Uploaded Images */}
        {images.length > 0 && (
          <div className="space-y-4">
            {images.map((img, idx) => (
              <div key={idx} className="relative h-[200px] bg-black rounded-sm overflow-hidden border border-[#2a2a2c]">
                <img src={img.preview} alt="Uploaded" className="w-full h-full object-cover opacity-80" />
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute top-2 right-2 w-5 h-5 bg-[#990f02] flex items-center justify-center rounded-[2px] shadow-md hover:bg-red-700"
                >
                  <X className="w-3 h-3 text-white" strokeWidth={3} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Submit Area */}
        <div className="pt-6">
          <button
            type="submit"
            disabled={addUpdate.isPending || isUploading}
            className={`w-full h-[64px] bg-[#fdbda1] text-[#541b0b] font-black tracking-[0.2em] uppercase flex items-center justify-center gap-2 group transition-colors duration-300 rounded-[2px] ${(addUpdate.isPending || isUploading) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white'}`}
          >
            <span className="text-[12px] leading-none mt-[2px]">{addUpdate.isPending ? 'Posting...' : isUploading ? 'Wait for upload...' : 'Post Update'}</span>
            {!addUpdate.isPending && !isUploading && (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            )}
          </button>
          
          <div className="text-center mt-4">
            <span className="text-zinc-600 text-[7px] font-bold tracking-widest uppercase">
              Automatically logged as 'Manager' at {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>

      </form>
    </div>
  );
}
