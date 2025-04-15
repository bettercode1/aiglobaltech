import React from 'react';

const BettercodeLogotype: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="text-cyan-400 flex items-center">
        <svg
          width="34"
          height="34"
          viewBox="0 0 34 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="34"
            height="34"
            rx="4"
            fill="#121212"
          />
          <path
            d="M26 8L18 12V16L26 12V8Z"
            fill="#22D3EE"
          />
          <path
            d="M8 16L16 12V8L8 12V16Z"
            fill="#22D3EE"
          />
          <path
            d="M8 22L16 26V18L8 22Z"
            fill="#22D3EE"
          />
          <path
            d="M26 18L18 22V26L26 22V18Z"
            fill="#22D3EE"
          />
          <circle
            cx="17"
            cy="17"
            r="5"
            fill="#121212"
            stroke="#22D3EE"
            strokeWidth="2"
          />
        </svg>
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