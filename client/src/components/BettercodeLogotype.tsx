import React from "react";
import aiglobaltechLogo from "../assets/aiGolabalTech.png";

interface BettercodeLogotypeProps {
  showText?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function BettercodeLogotype({ showText = true, className, style }: BettercodeLogotypeProps) {
  return (
    <div
      style={{ display: 'flex', alignItems: 'center', gap: 16, ...style, border: 'none', outline: 'none', boxShadow: 'none' }}
      className={className}
    >
      <img
        src={aiglobaltechLogo}
        alt="AI Global Tech Logo"
        style={{ height: style?.height || 40, border: 'none', outline: 'none', boxShadow: 'none' }}
        draggable={false}
      />
      {showText && (
        <span style={{ color: 'white', fontWeight: 'bold', fontSize: 24, letterSpacing: 1 }}>AiGlobalTech</span>
      )}
    </div>
  );
}