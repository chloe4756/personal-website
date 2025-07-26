'use client';

import { useState, useEffect, useRef } from 'react';
import { BoardingPass } from './BoardingPass';
import { experiences } from '../data/experiences';

export function StackedExperiences() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = sectionRefs.current.map((section, index) => {
      if (!section) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndex(index);
          }
        },
        {
          threshold: 0.95, 
        }
      );
      
      observer.observe(section);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, []);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const windowHeight = window.innerHeight;
          const progress = scrollTop / windowHeight;
          setScrollProgress(progress);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDotClick = (index: number) => {
    const targetY = index * window.innerHeight;
    
    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative w-full">
      <div className="hidden xl:block fixed left-8 top-1/2 transform -translate-y-1/2 -translate-y-32 z-50">
        <div className="text-gray-600 font-mono text-sm tracking-widest">
          ITINERARY
        </div>
      </div>

      <div className="hidden xl:flex fixed left-8 top-1/2 transform -translate-y-1/2 flex-col space-y-8 z-50">
        <div 
          className="absolute left-2 w-0.5 transform -translate-x-1/2"
          style={{
            height: `${(experiences.length + 2) * 28}px`, // 32px per gap + 16px to reach center of last dot
            background: 'repeating-linear-gradient(to bottom, #9CA3AF 0px, #9CA3AF 4px, transparent 4px, transparent 8px)',
            top: '8px',
            zIndex: 1,
          }}
        />

        <div
          className="absolute left-2 transform -translate-x-1/2 -translate-y-1/2 z-30"
          style={{
            top: `${8 + (scrollProgress * 52)}px`, 
          }}
        >
          <img 
            src="/plane.png"
            alt="airplane"
            className="w-4 h-4" 
            style={{ 
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
            }}
          />
        </div>

        
        {experiences.map((experience, index) => (
          <div 
            key={experience.id}
            className="flex items-center space-x-3 relative"
            style={{ zIndex: 10 }}
          >
            <div 
              className={`w-4 h-4 rounded-full border-2 transition-all duration-300 cursor-pointer ${
                index === activeIndex
                  ? 'bg-gray-800 border-gray-800 scale-125' 
                  : 'bg-gray-300 border-gray-400 hover:bg-gray-400 hover:scale-110'
              }`}
              style={{ zIndex: 10 }}
              onClick={() => handleDotClick(index)}
            />
            <span 
              className={`font-mono text-sm transition-all duration-300 cursor-pointer ${
                index === activeIndex
                  ? 'text-gray-800 font-bold'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              style={{ zIndex: 10 }}
              onClick={() => handleDotClick(index)}
            >
              {experience.label || experience.company.split(' ')[0]}
            </span>
          </div>
        ))}
      </div>

      <div 
        className="absolute left-1/2 w-0.5 transform -translate-x-1/2 z-0"
        style={{
          top: '50vh',
          height: `${(experiences.length - 1) * 100}vh`, // End at center of last section
          background: 'repeating-linear-gradient(to bottom, #9CA3AF 0px, #9CA3AF 8px, transparent 8px, transparent 16px)',
        }}
      />


      <div className="w-full relative z-10">
        {experiences.map((experience, index) => (
          <div
            key={experience.id}
            ref={(el) => { sectionRefs.current[index] = el; }}
            className="w-full h-screen flex items-center justify-center"
            style={{ scrollSnapAlign: 'center' }}
          >
            <BoardingPass
              experience={experience}
              isActive={index === activeIndex}
              stackPosition={0}
            />
          </div>
        ))}
      </div>

    </div>
  );
}