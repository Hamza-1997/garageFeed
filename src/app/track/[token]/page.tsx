'use client';

import { Wrench, Bell, Menu, MessageSquare } from 'lucide-react';
import { ImageCarousel } from '@/components/ui/ImageCarousel';

export default function ClientTrackPage() {
  return (
    <div className="relative min-h-screen pb-12 bg-[#0c0c0e]">
      {/* Top Transparent Nav overlay */}
      <header className="absolute top-0 w-full z-50 bg-gradient-to-b from-black/80 to-transparent">
        <div className="px-5 h-16 flex items-center justify-between">
          <div className="font-bold flex items-center gap-2 text-[#f08c5c]">
            <Wrench className="w-5 h-5 -rotate-12" />
            <span className="tracking-[0.15em] text-sm uppercase">Auto_Lab</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-8 h-8 rounded-full bg-zinc-900/80 flex items-center justify-center text-zinc-400 hover:text-white backdrop-blur-md">
              <Bell className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-full bg-zinc-900/80 flex items-center justify-center text-zinc-400 hover:text-white backdrop-blur-md">
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <div className="w-full h-[320px] relative">
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6dnZCFdUjZkrxVFhqyLzalz0e3f7qPzBxcnvfTG3MDIjk-iExrJ_CFw9KtwaOyHXHl9oFifsCxNZHauNpRR8W4d4BFPZYqHxQmMlchcjS0JOp5qpTWpshvbjtc5NFLTUx8SlAoPCco6OKOLqh6gmSIeJcrEk8wKxmubmhfwz9BtQLjxBEbI7wjnaX4QNPaZZVG7JuXZ2DopMeLqo9IdTIjNbECZuvvvmUgna5HNH0w-wRS9qJ1ZK_Zt75W0GyXUt8ughCmijo-ruf" 
          alt="Mustang" 
          className="w-full h-full object-cover"
        />
        {/* Gradient fade to background */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-[#0c0c0e]/30 to-transparent"></div>
      </div>

      <div className="px-6 -mt-20 relative z-10">
        
        {/* Title Block */}
        <div className="mb-8">
          <span className="text-[#ffcc00] text-[9px] font-black tracking-[0.2em] uppercase">Project ID: #7742-DP</span>
          <h1 className="text-3xl font-black text-white leading-tight mt-1 mb-6">
            1969 Mustang<br/>Fastback
          </h1>

          <div className="flex items-stretch mb-4">
            <div className="w-1 bg-[#ffcc00] mr-4 shrink-0 shadow-[0_0_8px_rgba(255,204,0,0.4)]"></div>
            <div className="flex flex-col py-0.5">
              <span className="text-zinc-500 text-[8px] uppercase tracking-[0.2em] font-bold mb-0.5">Current Phase</span>
              <span className="text-[#ffcc00] font-bold text-sm tracking-wide">Engine Calibration</span>
            </div>
          </div>

          <div className="bg-[#1c1c1e] p-4 text-[11px] text-zinc-300 font-medium leading-[1.6] rounded-sm border border-[#2a2a2c] shadow-lg">
            "Suspension assembly complete. Concentrating on testing the fuel system for optimal performance."
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 mb-12">
          <div className="bg-[#1c1c1e] p-4 rounded-[2px] flex flex-col justify-center border border-[#2a2a2c]">
            <span className="text-zinc-500 text-[8px] font-bold tracking-[0.2em] uppercase mb-1">Progress</span>
            <span className="text-2xl font-black text-white -tracking-[0.02em]">68%</span>
          </div>
          <div className="bg-[#1c1c1e] p-4 rounded-[2px] flex flex-col justify-center border border-[#2a2a2c]">
            <span className="text-zinc-500 text-[8px] font-bold tracking-[0.2em] uppercase mb-1">Lead Tech</span>
            <span className="text-[17px] font-black text-white tracking-tight">M. Rossi</span>
          </div>
          <div className="bg-[#1c1c1e] p-4 rounded-[2px] flex flex-col justify-center border border-[#2a2a2c]">
            <span className="text-zinc-500 text-[8px] font-bold tracking-[0.2em] uppercase mb-1">Days in Shop</span>
            <span className="text-[17px] font-black text-white tracking-tight">14</span>
          </div>
          <div className="bg-[#1c1c1e] p-4 rounded-[2px] flex flex-col justify-center border border-[#2a2a2c]">
            <span className="text-zinc-500 text-[8px] font-bold tracking-[0.2em] uppercase mb-1">Est Delivery</span>
            <span className="text-[17px] font-black text-[#ffbfa3] tracking-tight">Oct 12</span>
          </div>
        </div>

        {/* Timeline Header */}
        <div className="flex justify-between items-end border-b border-zinc-800 pb-3 mb-8">
          <h2 className="text-[22px] font-black text-white tracking-tighter uppercase font-mono">Build Timeline</h2>
          <span className="text-zinc-500 text-[8px] font-bold tracking-[0.2em] uppercase mb-1">Live Updated</span>
        </div>

        {/* Timeline Items */}
        <div className="space-y-12">
          {/* Card 1 */}
          <div className="flex flex-col">
            <span className="text-zinc-400 text-[9px] uppercase font-bold tracking-[0.15em] mb-2">Today, 09:12 AM</span>
            <h3 className="text-white font-bold text-lg leading-snug mb-3">Precision Valve Adjustment</h3>
            <p className="text-[13px] text-zinc-400 leading-[1.6] mb-4">
              Technician Rossi has completed the manual valve lash adjustment to factory racing specifications. Tolerances closely exceed 0.005".
            </p>
            <div className="flex gap-2 mb-5">
              <span className="bg-[#242426] text-zinc-300 text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-[2px]">Engine</span>
              <span className="bg-[#242426] text-zinc-300 text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-[2px]">Performance</span>
            </div>
            <ImageCarousel images={['https://images.unsplash.com/photo-1627063162125-96263f9185a5?auto=format&fit=crop&q=80&w=600']} />
          </div>

          {/* Card 2 */}
          <div className="flex flex-col">
            <span className="text-zinc-400 text-[9px] uppercase font-bold tracking-[0.15em] mb-2">Yesterday, 04:30 PM</span>
            <h3 className="text-white font-bold text-lg leading-snug mb-3">Chassis Undercoating</h3>
            <p className="text-[13px] text-zinc-400 leading-[1.6] mb-4">
              Applied two layers of industrial grade ceramic coating to the underchassis. Provides 10-year corrosion protection and heat resistance.
            </p>
            <div className="flex gap-2 mb-5">
              <span className="bg-[#242426] text-zinc-300 text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-[2px]">Chassis</span>
              <span className="bg-[#242426] text-zinc-300 text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-[2px]">Protection</span>
            </div>
            <ImageCarousel images={['https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=600']} />
          </div>

          {/* Card 3 */}
          <div className="flex flex-col">
            <span className="text-zinc-400 text-[9px] uppercase font-bold tracking-[0.15em] mb-2">Sept 28, 2023</span>
            <h3 className="text-white font-bold text-lg leading-snug mb-3">Component Arrival</h3>
            <p className="text-[13px] text-zinc-400 leading-[1.6] mb-4">
              The custom Brembo braking system and forged HRE wheels have arrived. Unboxed and inspected for assembly.
            </p>
            <ImageCarousel 
              images={[
                "https://images.unsplash.com/photo-1579737154201-9f936f4de814?auto=format&fit=crop&q=80&w=400",
                "https://images.unsplash.com/photo-1620802051676-e1781216d6c9?auto=format&fit=crop&q=80&w=400"
              ]} 
            />
          </div>
        </div>

        {/* Investment Summary area */}
        <div className="mt-16 pt-8 border-t-[3px] border-[#f08c5c]">
          <h2 className="text-white font-black text-lg tracking-widest uppercase mb-8">Investment Summary</h2>
          
          <div className="flex flex-col gap-5 mb-10">
            <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-[0.15em]">
              <span className="text-zinc-400">Parts & Components</span>
              <span className="text-white font-mono text-xs">$12,450.00</span>
            </div>
            <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-[0.15em]">
              <span className="text-zinc-400">Technician Labor (42 hrs)</span>
              <span className="text-white font-mono text-xs">$6,300.00</span>
            </div>
            <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-[0.15em]">
              <span className="text-zinc-400">Shop Supplies & Fees</span>
              <span className="text-white font-mono text-xs">$840.00</span>
            </div>
          </div>

          <div className="flex flex-col items-end mb-8">
            <span className="text-zinc-500 text-[8px] uppercase tracking-[0.2em] font-bold mb-1">Total to Date</span>
            <span className="text-4xl font-black text-[#ffbfa3] tracking-tighter">$19,590.00</span>
          </div>

          <button className="w-full h-[60px] bg-[#fdbda1] text-[#541b0b] font-black tracking-[0.2em] uppercase flex items-center justify-center gap-2 group hover:bg-white transition-colors duration-300 rounded-[2px]">
            <MessageSquare className="w-4 h-4 mt-0.5 fill-[#541b0b] opacity-80" />
            <span className="text-[11px] leading-none mt-1">Message Shop</span>
          </button>
        </div>

      </div>
    </div>
  );
}
