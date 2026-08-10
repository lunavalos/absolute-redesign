'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { mockClients } from '../data/clients';

export default function ClientsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(4);

  // Responsive number of visible items
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleItems(2);
      else if (window.innerWidth < 1024) setVisibleItems(3);
      else setVisibleItems(4);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalItems = mockClients.length;
  // To avoid empty space at the end, the max index is totalItems - visibleItems
  const maxIndex = Math.max(0, totalItems - visibleItems);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000); 
    return () => clearInterval(timer);
  }, [maxIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <div className="w-full py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-12 sm:px-16 lg:px-20 relative">
        
        {/* Navigation Arrows */}
        <button 
          onClick={prevSlide}
          className="absolute left-0 lg:left-4 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-[#0E4194] transition-colors z-10 bg-white rounded-full shadow-sm hover:shadow-md"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        <button 
          onClick={nextSlide}
          className="absolute right-0 lg:right-4 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-[#0E4194] transition-colors z-10 bg-white rounded-full shadow-sm hover:shadow-md"
        >
          <ChevronRight className="w-8 h-8" />
        </button>

        {/* Track Container */}
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out items-center"
            style={{ transform: `translateX(-${currentIndex * (100 / visibleItems)}%)` }}
          >
            {mockClients.map((client) => (
              <div 
                key={client.id} 
                className="flex-shrink-0 flex justify-center items-center px-4"
                style={{ width: `${100 / visibleItems}%` }}
              >
                <div className="relative w-full h-24 hover:scale-105 transition-all duration-300">
                  <Image
                    src={client.logoUrl}
                    alt={client.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
