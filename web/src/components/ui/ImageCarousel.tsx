'use client';

import { useState } from 'react';

export function ImageCarousel({ images }: { images: string[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const width = e.currentTarget.clientWidth;
    const index = Math.round(scrollLeft / width);
    if (index !== activeIndex && index >= 0 && index < images.length) {
      setActiveIndex(index);
    }
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="mb-4 w-full max-w-[full] overflow-hidden">
      <div 
        className="flex gap-2 overflow-x-auto snap-x snap-mandatory w-full [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        onScroll={handleScroll}
      >
        {images.map((img, i) => (
          <div key={i} className={`shrink-0 ${images.length === 1 ? 'w-full' : 'w-[92%] sm:w-[95%]'} rounded-[2px] overflow-hidden h-[180px] bg-black border border-[#2a2a2c] snap-start`}>
            <img src={img} alt={`Update ${i + 1}`} className="w-full h-full object-cover grayscale opacity-80" />
          </div>
        ))}
        {/* Edge spacer */}
        {images.length > 1 && <div className="shrink-0 w-[4%] sm:w-[1%]" />}
      </div>
      
      {images.length > 1 && (
        <div className="flex justify-center gap-[4px] mt-3">
          {images.map((_, i) => (
            <div 
              key={i} 
              className={`h-[3px] rounded-full transition-all duration-300 ${i === activeIndex ? 'w-[12px] bg-[#ffbfa3]' : 'w-[4px] bg-zinc-700'}`} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
