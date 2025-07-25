'use client';

import { useState, useEffect } from 'react';
import { Mail, Linkedin, Github } from 'lucide-react';
import { StackedExperiences } from "../components/StackedExperiences";

export default function Home() {
  const [showSocialIcons, setShowSocialIcons] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      const isAtBottom = scrollTop + windowHeight >= documentHeight - 100;
      setShowSocialIcons(isAtBottom);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className="bg-cover bg-center bg-no-repeat" 
      style={{ backgroundImage: 'url(/background.avif)' }}
    >
      <StackedExperiences />
      
      <div 
        className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 transition-opacity duration-500 flex items-center space-x-6 ${
          showSocialIcons ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <a
          href="mailto:cfyip@uwaterloo.ca"
          className="text-gray-700 hover:text-gray-900 transition-colors duration-200"
          aria-label="Email"
        >
          <Mail size={24} />
        </a>
        <a
          href="https://linkedin.com/in/chloe-yip-c4756a/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 hover:text-gray-900 transition-colors duration-200"
          aria-label="LinkedIn"
        >
          <Linkedin size={24} />
        </a>
        <a
          href="https://github.com/chloe4756"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 hover:text-gray-900 transition-colors duration-200"
          aria-label="GitHub"
        >
          <Github size={24} />
        </a>
      </div>
    </div>
  );
}
