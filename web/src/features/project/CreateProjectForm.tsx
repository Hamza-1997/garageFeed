"use client";

import { useCreateProject } from "./useProjects";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { User, CarFront, ArrowRight, ShieldCheck, Cloud, Camera, X } from "lucide-react";

import { compressAndUploadImage } from "@/lib/upload";

export function CreateProjectForm() {
  const [clientName, setClientName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [workRequired, setWorkRequired] = useState("");
  const [status, setStatus] = useState<"WAITING" | "IN_ASSEMBLY" | "WAITING_FOR_PARTS" | "METAL_WORK" | "QC" | "COMPLETED">("WAITING");
  const [imageUrl, setImageUrl] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const createProject = useCreateProject();
  const router = useRouter();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setImagePreview(preview);
      setIsUploading(true);
      try {
        const key = await compressAndUploadImage(file);
        setImageUrl(key);
      } catch (error: any) {
        setImagePreview("");
        alert(error.message || 'Failed to upload image. Please try again.');
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const projectTitle = `${year} ${make} ${model}`.trim();
    if (!projectTitle) return;

    createProject.mutate(
      { 
        projectTitle,
        clientName: clientName || "Unknown Client",
        clientPhone: phoneNumber,
        year,
        make,
        model,
        workRequired,
        status,
        imageUrl,
      },
      {
        onSuccess: () => {
          router.push("/dashboard");
        },
      },
    );
  };

  return (
    <div className="pt-2 pb-12">
      {/* Header Area */}
      <div className="flex flex-col mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-[3px] bg-[#d4a373]"></div>
          <span className="text-[#d4a373] text-[9px] font-bold tracking-[0.2em] uppercase">
            Workshop Operations
          </span>
        </div>
        <h1 className="text-4xl font-bold text-white tracking-tight mb-4">
          Initialize New Build
        </h1>
        <p className="text-zinc-400 text-[13px] leading-relaxed pr-6 text-balance">
          Input the following specifications to generate a new job card and
          assign build resources. Precision in data entry ensures workflow
          accuracy.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Client Identity Block */}
        <div className="bg-[#1c1c1e] p-6 relative overflow-hidden flex flex-col pt-7 shadow-lg">
          <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#ffbfa3]"></div>

          <div className="flex items-center gap-4 mb-7 pl-1">
            <User className="w-4 h-4 text-[#ffbfa3]" strokeWidth={2.5} />
            <h3 className="text-white text-[11px] font-bold tracking-[0.2em] uppercase">
              Client Identity
            </h3>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col">
              <label className="text-zinc-500 text-[9px] uppercase font-bold tracking-[0.15em] mb-2.5">
                Full Name / Organization
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="e.g. Jonathan Wick"
                className="w-full bg-[#111111] border-none h-[52px] text-zinc-300 px-4 placeholder:text-zinc-700 focus:outline-none focus:ring-1 focus:ring-[#ffbfa3]/50 rounded-[2px]"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-zinc-500 text-[9px] uppercase font-bold tracking-[0.15em] mb-2.5">
                Phone Number (Digits Only)
              </label>
              <input
                type="number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="5550000000"
                className="w-full bg-[#111111] border-none h-[52px] text-zinc-300 px-4 placeholder:text-zinc-700 focus:outline-none focus:ring-1 focus:ring-[#ffbfa3]/50 rounded-[2px]"
              />
            </div>
          </div>
        </div>

        {/* Technical Specs Block */}
        <div className="bg-[#1c1c1e] p-6 relative overflow-hidden flex flex-col pt-7 shadow-lg">
          <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#93c5d6]"></div>

          <div className="flex items-center gap-4 mb-7 pl-1">
            <CarFront className="w-4 h-4 text-[#93c5d6]" strokeWidth={2.5} />
            <h3 className="text-white text-[11px] font-bold tracking-[0.2em] uppercase">
              Technical Specs
            </h3>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col">
              <label className="text-zinc-500 text-[9px] uppercase font-bold tracking-[0.15em] mb-2.5">
                Year
              </label>
              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="1969"
                className="w-full bg-[#111111] border-none h-[52px] text-zinc-300 px-4 placeholder:text-zinc-700 focus:outline-none focus:ring-1 focus:ring-[#93c5d6]/50 rounded-[2px]"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-zinc-500 text-[9px] uppercase font-bold tracking-[0.15em] mb-2.5">
                Make
              </label>
              <input
                type="text"
                value={make}
                onChange={(e) => setMake(e.target.value)}
                placeholder="Ford"
                className="w-full bg-[#111111] border-none h-[52px] text-zinc-300 px-4 placeholder:text-zinc-700 focus:outline-none focus:ring-1 focus:ring-[#93c5d6]/50 rounded-[2px]"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-zinc-500 text-[9px] uppercase font-bold tracking-[0.15em] mb-2.5">
                Model
              </label>
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="Mustang Fastback"
                className="w-full bg-[#111111] border-none h-[52px] text-zinc-300 px-4 placeholder:text-zinc-700 focus:outline-none focus:ring-1 focus:ring-[#93c5d6]/50 rounded-[2px]"
                required
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-zinc-500 text-[9px] uppercase font-bold tracking-[0.15em] mb-2.5">
                Project Description / Work Required
              </label>
              <textarea
                value={workRequired}
                onChange={(e) => setWorkRequired(e.target.value)}
                placeholder="e.g. Full frame-off restoration, engine swap to Coyote 5.0"
                className="w-full bg-[#111111] border-none h-[100px] py-4 text-zinc-300 px-4 placeholder:text-zinc-700 focus:outline-none focus:ring-1 focus:ring-[#93c5d6]/50 rounded-[2px] resize-none"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-zinc-500 text-[9px] uppercase font-bold tracking-[0.15em] mb-2.5">
                Initial Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full bg-[#111111] border-none h-[52px] text-zinc-300 px-4 focus:outline-none focus:ring-1 focus:ring-[#93c5d6]/50 rounded-[2px] appearance-none"
              >
                <option value="WAITING">Waiting in Queue</option>
                <option value="WAITING_FOR_PARTS">Waiting For Parts</option>
                <option value="IN_ASSEMBLY">In Assembly</option>
                <option value="METAL_WORK">Metal Work</option>
                <option value="QC">Quality Control / Final Inspection</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>

            <div className="flex flex-col mt-2">
              <label className="text-zinc-500 text-[9px] uppercase font-bold tracking-[0.15em] mb-2.5">
                Hero Photo (Optional)
              </label>

              {imagePreview ? (
                <div className="relative h-[180px] bg-black rounded-[2px] overflow-hidden border border-[#2a2a2c]">
                  <img src={imagePreview} alt="Uploaded preview" className="w-full h-full object-cover opacity-80" />
                  <button
                    type="button"
                    onClick={() => {
                      setImageUrl("");
                      setImagePreview("");
                    }}
                    className="absolute top-2 right-2 w-7 h-7 bg-[#990f02] flex items-center justify-center rounded-[2px] shadow-md hover:bg-red-700"
                  >
                    <X className="w-4 h-4 text-white" strokeWidth={3} />
                  </button>
                </div>
              ) : (
                <label className={`border border-dashed border-zinc-700 bg-[#111111] flex flex-col items-center justify-center h-[120px] rounded-[2px] transition-colors ${isUploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-zinc-900/50'}`}>
                  <Camera className="w-5 h-5 text-zinc-500 mb-2" />
                  <span className="text-zinc-500 text-[9px] uppercase font-bold tracking-widest">{isUploading ? 'Uploading...' : 'Select Memory/Upload'}</span>
                  <input 
                    type="file" 
                    accept="image/jpeg, image/png, image/webp" 
                    className="hidden" 
                    onChange={handleImageUpload}
                    disabled={isUploading}
                  />
                </label>
              )}
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={createProject.isPending || isUploading}
            className={`w-full h-[88px] bg-[#fdbda1] text-[#541b0b] font-bold tracking-[0.25em] uppercase flex items-center justify-center group transition-colors duration-300 px-6 relative ${(createProject.isPending || isUploading) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white'}`}
          >
            <span className="text-[13px] leading-[1.6] text-center mt-1">
              {createProject.isPending ? "Registering..." : isUploading ? "Uploading..." : "Register New"}
              {!createProject.isPending && !isUploading && <br />}
              {!createProject.isPending && !isUploading && "Build"}
            </span>
            {!createProject.isPending && !isUploading && (
              <ArrowRight
                className="w-5 h-5 absolute right-6 group-hover:translate-x-1 transition-transform"
                strokeWidth={2.5}
              />
            )}
          </button>
        </div>

        {/* Footer info blocks */}
        <div className="flex justify-between items-center px-1 pt-2 pb-6">
          <div className="flex items-center gap-2.5">
            <ShieldCheck
              className="w-4 h-4 text-zinc-500 max-w-4"
              strokeWidth={2}
            />
            <span className="text-zinc-500 text-[8px] font-bold uppercase tracking-[0.15em] leading-tight">
              Internal System
              <br />
              Secure
            </span>
          </div>

          <div className="flex items-center gap-2.5 text-right">
            <Cloud className="w-4 h-4 text-zinc-500 max-w-4" strokeWidth={2} />
            <span className="text-zinc-500 text-[8px] font-bold uppercase tracking-[0.15em] leading-tight text-left">
              Auto-Sync
              <br />
              Enabled
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}
