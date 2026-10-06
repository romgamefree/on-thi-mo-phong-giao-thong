import React from 'react';

interface HeaderProps {
  onGoHome?: () => void;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ onGoHome, subtitle }) => {
  return (
    <header className="bg-[#1b3a8c] text-white shadow-md select-none sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-3.5 flex items-center justify-between">
        <div
          onClick={onGoHome}
          className="w-full text-center cursor-pointer group"
        >
          <h1 className="text-base sm:text-lg md:text-xl font-bold tracking-wide uppercase transition-opacity group-hover:opacity-95">
            HỆ THỐNG ÔN TẬP VÀ THI THỬ MÔ PHỎNG GIAO THÔNG
          </h1>
          {subtitle && (
            <p className="text-xs text-blue-200 mt-0.5 hidden sm:block">{subtitle}</p>
          )}
        </div>
      </div>
    </header>
  );
};
