"use client";

import { useCreateProject } from "./useProjects";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { User, CarFront, ArrowRight, ShieldCheck, Cloud } from "lucide-react";

export function CreateProjectForm() {
  const [clientName, setClientName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");

  const createProject = useCreateProject();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // As per requirement: "will add the backend later, for now use placeholders for submitting function or maybe log the data"
    console.log("Registering NEW BUILD:", {
      clientName,
      phoneNumber,
      year,
      make,
      model,
    });
    console.log("testing deploy");

    // Since our mock useProjects mutation expects specific fields to satisfy the interface temporarily
    const name = `${year} ${make} ${model}`.trim();
    const description = `Phone: ${phoneNumber}\nClient: ${clientName}`;

    if (!name) return; // Prevent empty names

    createProject.mutate(
      { name, description },
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
                Phone Number
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+1 (555) 000-0000"
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
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={createProject.isPending}
            className="w-full h-[88px] bg-[#fdbda1] text-[#541b0b] font-bold tracking-[0.25em] uppercase flex items-center justify-center group hover:bg-white transition-colors duration-300 px-6 relative"
          >
            <span className="text-[13px] leading-[1.6] text-center mt-1">
              Register New
              <br />
              Build
            </span>
            <ArrowRight
              className="w-5 h-5 absolute right-6 group-hover:translate-x-1 transition-transform"
              strokeWidth={2.5}
            />
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
