import React from 'react';

const BettercodeLogotype: React.FC<{ className?: string, showText?: boolean }> = ({ 
  className = '',
  showText = true 
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex items-center justify-center h-10 w-10 bg-black rounded-full border-2 border-cyan-400">
        <span className="font-bold text-xs text-cyan-400">BC</span>
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