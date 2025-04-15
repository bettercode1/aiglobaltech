import React from 'react';

const AILHLogotype: React.FC<{ className?: string, showText?: boolean }> = ({ 
  className = '',
  showText = true 
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex items-center justify-center h-12 w-12 bg-gradient-to-br from-purple-600 to-cyan-500 rounded-lg shadow-lg shadow-cyan-500/20">
        <span className="font-bold text-sm text-white tracking-widest">AILH</span>
      </div>
      {showText && (
        <div className="ml-3">
          <div className="flex flex-col">
            <span className="font-sans font-bold text-xl">
              <span className="text-white">AI</span> 
              <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent ml-1">
                Learning Hub
              </span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AILHLogotype;