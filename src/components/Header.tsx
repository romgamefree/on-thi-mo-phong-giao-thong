import React, { useState } from 'react';
import { Menu, X, BookOpen, FileCheck2, HelpCircle, Scale, Mail, Home } from 'lucide-react';
import { AppMode } from '../App';

interface HeaderProps {
  onGoHome?: () => void;
  currentMode?: AppMode;
  onNavigate?: (mode: AppMode) => void;
}

export const Header: React.FC<HeaderProps> = ({ onGoHome, currentMode = 'home', onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; mode: AppMode; icon: React.ReactNode }[] = [
    { label: 'Trang chủ', mode: 'home', icon: <Home size={14} /> },
    { label: 'Ôn tập 120 câu', mode: 'study', icon: <BookOpen size={14} /> },
    { label: 'Thi thử 18 đề', mode: 'select_exam', icon: <FileCheck2 size={14} /> },
    { label: 'Mẹo & Hướng dẫn', mode: 'guide', icon: <HelpCircle size={14} /> },
    { label: 'Giới thiệu & Pháp lý', mode: 'about', icon: <Scale size={14} /> },
    { label: 'Góp ý / Báo lỗi', mode: 'contact', icon: <Mail size={14} /> },
  ];

  const handleNav = (mode: AppMode) => {
    if (onNavigate) {
      onNavigate(mode);
    } else if (mode === 'home' && onGoHome) {
      onGoHome();
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-[#1b3a8c] text-white shadow-md select-none sticky top-0 z-30">
      {/* Top Banner Row */}
      <div className="max-w-[1600px] mx-auto px-4 py-2.5 flex items-center justify-between border-b border-blue-900/60">
        <div
          onClick={() => handleNav('home')}
          className="cursor-pointer group flex items-center gap-2.5"
        >
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center font-bold text-white border border-white/20">
            120
          </div>
          <div>
            <span className="text-base sm:text-lg font-bold tracking-wide uppercase block leading-tight group-hover:text-blue-100 transition-colors">
              HỆ THỐNG ÔN TẬP VÀ THI THỬ MÔ PHỎNG GIAO THÔNG
            </span>
            <span className="text-[11px] text-blue-200 hidden sm:block">
              Chuẩn sát hạch Cục Đường Bộ Việt Nam · 120 tình huống & 18 bộ đề
            </span>
          </div>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1.5 rounded bg-blue-900/80 hover:bg-blue-800 text-white cursor-pointer"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Desktop Secondary Navigation Bar */}
      <nav className="hidden md:block bg-[#162e70] border-b border-blue-950 px-4">
        <div className="max-w-[1600px] mx-auto flex items-center gap-1 overflow-x-auto text-xs py-1">
          {navItems.map((item) => {
            const isActive = currentMode === item.mode;
            return (
              <button
                key={item.mode}
                onClick={() => handleNav(item.mode)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs font-semibold'
                    : 'text-blue-100/90 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#162e70] border-b border-blue-950 px-4 py-2 space-y-1 animate-in fade-in">
          {navItems.map((item) => {
            const isActive = currentMode === item.mode;
            return (
              <button
                key={item.mode}
                onClick={() => handleNav(item.mode)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded text-xs font-medium transition-colors text-left cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-blue-100 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
