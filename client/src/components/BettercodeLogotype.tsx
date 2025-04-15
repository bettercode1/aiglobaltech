import React from 'react';
import logoImage from '../assets/bettercode-logo.png';

const BettercodeLogotype: React.FC<{ className?: string, showText?: boolean }> = ({ 
  className = '',
  showText = false
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex items-center h-10">
        <div className="bg-white rounded-full p-1">
          <img src={logoImage} alt="Bettercode Technologies Logo" className="h-full" />
        </div>
      </div>
      {showText && (
        <div className="ml-2">
          <div className="flex flex-col">
            <span className="font-sans font-bold text-xl">Better<span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">code</span></span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BettercodeLogotype;