import React from 'react';
import logoImage from '../assets/bettercode-logo.png';

const BettercodeLogotype: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex items-center h-12">
        <img src={logoImage} alt="Bettercode Technologies Logo" className="h-full" />
      </div>
      <div className="ml-2">
        <div className="flex flex-col">
          <span className="font-sans font-bold text-xl">Better<span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">code</span></span>
          <span className="text-xs text-gray-400">Technologies PVT LTD</span>
        </div>
      </div>
    </div>
  );
};

export default BettercodeLogotype;