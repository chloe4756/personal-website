import { motion } from 'framer-motion';
import { Plane } from "lucide-react";
import { BoardingPassProps } from "../types";
import { boardingPassVariants } from "../utils/animations";

export function BoardingPass({ 
  experience,
  isActive = true,
  stackPosition = 0
}: BoardingPassProps) {
  return (
    <motion.div 
      className="w-full max-w-4xl mx-auto rounded-2xl shadow-2xl overflow-hidden flex"
      variants={boardingPassVariants}
      initial="hidden"
      animate="visible"
      custom={stackPosition}
      style={{
        backgroundColor: '#f9f9fd',
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      <div className="flex-1 p-8 space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl tracking-[0.3em] font-mono uppercase">
            {experience.header || 'BOARDING PASS'}
          </h1>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="font-mono tracking-wide">NAME OF PASSENGER:</span>
            <span className="font-mono">Chloe Yip</span>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono tracking-wide">DESTINATION:</span>
            <span className="font-mono">{experience.company}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono tracking-wide">CITY:</span>
            <span className="font-mono">{experience.location}</span>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono tracking-wide">DEPARTURE:</span>
            <span className="font-mono">{experience.startDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono tracking-wide">ARRIVAL:</span>
            <span className="font-mono">{experience.endDate}</span>
          </div>
        </div>

        <div className="flex justify-between items-end pt-4">
          <div className="flex items-center gap-2">
            <span className="font-mono tracking-wide">FLIGHT:</span>
            <span className="font-mono">{experience.boardingPassNumber}</span>
          </div>
          
          <div className="border-2 border-black p-3 text-center">
            <div className="font-mono text-sm tracking-wide">SEAT</div>
            <div className="font-mono text-1xl font-bold">{experience.seat}</div>
          </div>
        </div>
      </div>

      <div className="w-12 relative flex items-center justify-center" style={{ backgroundColor: '#f9f9fd' }}>
        <img 
          src="/barcode.png" 
          alt="barcode" 
          className="h-full w-full object-cover"
          style={{ transform: 'scaleY(1.15)' }}
        />
      </div>

      <div className="w-64 p-6 space-y-4" style={{ backgroundColor: '#f9f9fd' }}>
        <div className="flex items-center justify-between mb-6">
          <Plane className="w-8 h-8 text-black" />
          <div></div>
        </div>

        <div className="space-y-1">
          <div className="font-mono tracking-wide">
            {experience.header === 'EDUCATION' ? 'COURSES' : 'SKILLS'}
          </div>
          <div className="font-mono text-sm text-gray-700">
            {experience.skills.join(', ')}
          </div>
        </div>
      </div>
    </motion.div>
  );
}