import React from 'react';
import { ShieldCheck, BookOpen, FileCheck2, Scale, Lock, Mail, ExternalLink, HelpCircle } from 'lucide-react';
import { AppMode } from '../App';

interface FooterProps {
  onNavigate: (mode: AppMode) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-[1600px] mx-auto px-4 py-10 md:py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Col 1: System Branding & Authority */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-white font-bold text-sm tracking-wide uppercase">
            <ShieldCheck size={20} className="text-blue-400" />
            <span>Hệ Thống Sát Hạch Mô Phỏng</span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed">
            Nền tảng ôn tập 120 tình huống và thi thử 18 bộ đề mô phỏng các tình huống tiềm ẩn nguy cơ mất an toàn giao thông đường bộ, phục vụ kỳ thi cấp giấy phép lái xe ô tô theo quy chuẩn Cục Đường Bộ Việt Nam.
          </p>
          <div className="flex items-center gap-2 pt-1 text-[11px] text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Cập nhật ngân hàng câu hỏi mới nhất 2026</span>
          </div>
        </div>

        {/* Col 2: Learning & Test Navigation */}
        <div className="space-y-3">
          <h4 className="text-white font-bold text-xs uppercase tracking-wider">
            Nội Dung Sát Hạch
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button
                onClick={() => onNavigate('study')}
                className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <BookOpen size={13} className="text-blue-400" />
                <span>Ôn tập 120 tình huống mô phỏng</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('select_exam')}
                className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <FileCheck2 size={13} className="text-emerald-400" />
                <span>Thi thử 18 bộ đề chuẩn hóa</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('guide')}
                className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <HelpCircle size={13} className="text-amber-400" />
                <span>Mẹo thi & Phân tích 4 nội dung đánh giá</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Legal & Privacy */}
        <div className="space-y-3">
          <h4 className="text-white font-bold text-xs uppercase tracking-wider">
            Cơ Sở Pháp Lý & Chính Sách
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button
                onClick={() => onNavigate('about')}
                className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Scale size={13} className="text-blue-400" />
                <span>Giới thiệu & Thông tư 04/2022/TT-BGTVT</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('policy')}
                className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Lock size={13} className="text-blue-400" />
                <span>Chính sách bảo mật quyền riêng tư</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('policy')}
                className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <ShieldCheck size={13} className="text-blue-400" />
                <span>Điều khoản sử dụng dịch vụ</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Col 4: Support & Feedback */}
        <div className="space-y-3">
          <h4 className="text-white font-bold text-xs uppercase tracking-wider">
            Hỗ Trợ & Đóng Góp Ý Kiến
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Học viên và giáo viên có đóng góp ý kiến về tình huống hoặc báo lỗi câu hỏi, vui lòng liên hệ ban biên tập.
          </p>
          <div>
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-1.5 bg-blue-700 hover:bg-blue-600 text-white px-3.5 py-1.5 rounded text-xs font-semibold transition-colors cursor-pointer"
            >
              <Mail size={13} />
              <span>Gửi góp ý / Báo lỗi</span>
            </button>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-slate-950 border-t border-slate-800/80 py-4 px-4 text-center text-[11px] text-slate-500">
        <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            © 2026 Hệ Thống Ôn Tập & Thi Thử Mô Phỏng Giao Thông. Bản quyền tài liệu phục vụ cộng đồng học lái xe ô tô Việt Nam.
          </span>
          <span className="text-slate-400 font-medium">
            Tối ưu hóa SEO & AI Search Engine Grounding
          </span>
        </div>
      </div>
    </footer>
  );
};
