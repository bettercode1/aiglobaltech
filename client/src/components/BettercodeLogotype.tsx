import React from "react";

interface BettercodeLogotypeProps {
  showText?: boolean;
  className?: string;
}

export default function BettercodeLogotype({ 
  showText = true, 
  className = "" 
}: BettercodeLogotypeProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex-shrink-0 mr-2">
        <div className="w-10 h-10 rounded-md bg-gradient-to-br from-cyan-500 to-purple-600 relative overflow-hidden flex items-center justify-center text-white font-bold">
          <span className="text-xl">BC</span>
        </div>
      </div>
      
      {showText && (
        <div>
          <div className="font-bold text-white text-xl tracking-tight leading-none">
            Bettercode
          </div>
          <div className="text-xs text-gray-300 font-medium">
            Technologies PVT LTD
          </div>
        </div>
      )}
    </div>
  );
}