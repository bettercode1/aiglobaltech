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
        {/* Logo styled after the Bettercode red/orange branding */}
        <div className="h-10 w-10 relative">
          <div className="absolute left-0 top-2 w-3 h-6 bg-red-500 transform -skew-x-12"></div>
          <div className="absolute right-0 top-2 w-3 h-6 bg-red-500 transform skew-x-12"></div>
          <div className="absolute right-0 bottom-0 w-1.5 h-1.5 rounded-full bg-red-500"></div>
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