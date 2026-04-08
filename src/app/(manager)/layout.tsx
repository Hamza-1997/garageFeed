import { Wrench, Search, Layers, Briefcase } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function ManagerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-[#111111] border-b border-zinc-800/80">
        <div className="px-5 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="font-bold flex items-center gap-2 hover:opacity-80 transition-opacity text-[#f08c5c]">
            <Wrench className="w-5 h-5 -rotate-12" />
            <span className="tracking-[0.15em] text-sm uppercase">Auto_Lab</span>
          </Link>
          {/* <div className="flex items-center gap-5">
            <button className="text-zinc-400 hover:text-white transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 rounded-full bg-zinc-800 overflow-hidden ring-2 ring-zinc-800">
              <img src="https://i.pravatar.cc/150?img=11" alt="User" className="w-full h-full object-cover" />
            </div>
          </div> */}
        </div>
      </header>

      <main className="flex-1 w-full relative pb-28">
        {children}
      </main>

      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-[#111111]/95 backdrop-blur-md border-t border-zinc-800/80 pb-safe z-50">
        <div className="flex justify-around items-end h-[68px] pb-4 px-2">
          <Link href="/dashboard" className="flex flex-col items-center gap-1 text-[#f08c5c] group">
            <Wrench className="w-5 h-5 -rotate-12 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] uppercase font-bold tracking-widest mt-1">Jobs</span>
          </Link>
          <Link href="#" className="flex flex-col items-center gap-1 text-zinc-500 hover:text-zinc-300 transition-colors group">
            <Layers className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] uppercase font-bold tracking-widest mt-1">Build Feed</span>
          </Link>
          <Link href="#" className="flex flex-col items-center gap-1 text-zinc-500 hover:text-zinc-300 transition-colors group">
            <Briefcase className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] uppercase font-bold tracking-widest mt-1">Clients</span>
          </Link>
        </div>
        <div className="absolute top-0 left-0 w-1/3 h-[2px]">
          <div className="w-16 h-full bg-[#f08c5c] mx-auto rounded-b shadow-[0_2px_8px_rgba(240,140,92,0.5)]" />
        </div>
      </nav>
    </>
  );
}
