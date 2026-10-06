import React from 'react';
import { BookOpen, FileCheck2, ShieldCheck, ArrowRight, HelpCircle, CheckCircle2 } from 'lucide-react';
import { EXAM_SETS, SITUATIONS, CHAPTERS } from '../data/examData';

interface HomeModeProps {
  onGoToStudy: () => void;
  onGoToExamSelect: () => void;
  onQuickStartExam: () => void;
  historyCount: number;
  passedCount: number;
  highestScore: number;
}

export const HomeMode: React.FC<HomeModeProps> = ({
  onGoToStudy,
  onGoToExamSelect,
  onQuickStartExam,
  historyCount,
  passedCount,
  highestScore,
}) => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-56px)] bg-[#f4f7fa]">
      {/* Hero Welcome Banner with Semantic Heading & SEO Keywords */}
      <section className="bg-gradient-to-b from-[#1b3a8c] to-[#152e6e] text-white py-10 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="inline-block bg-white/15 text-blue-100 text-xs px-3 py-1 rounded-full font-medium tracking-wide">
            CHUẨN SÁT HẠCH MÔ PHỎNG GIẤY PHÉP LÁI XE Ô TÔ (B1, B2, C, D, E)
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
            Ôn Tập 120 Tình Huống Mô Phỏng & Thi Thử 18 Bộ Đề Sát Hạch
          </h1>
          <p className="text-sm md:text-base text-blue-100/90 max-w-2xl mx-auto leading-relaxed">
            Hệ thống ôn luyện 120 tình huống mô phỏng giao thông và thi thử 18 bộ đề theo chuẩn quy định mới nhất của Cục Đường Bộ Việt Nam. Chấm điểm chính xác 4 phần (Tên tình huống, Dấu hiệu gián tiếp, Dấu hiệu trực tiếp, Phương án xử lý - 0,25đ/phần).
          </p>

          {/* Quick Action CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <button
              onClick={onGoToStudy}
              className="flex items-center gap-2 bg-white text-[#1b3a8c] hover:bg-blue-50 font-bold px-5 py-2.5 rounded-md shadow-sm transition-colors text-sm cursor-pointer"
            >
              <BookOpen size={17} />
              <span>Ôn tập 120 tình huống</span>
            </button>

            <button
              onClick={onGoToExamSelect}
              className="flex items-center gap-2 bg-[#0fa968] hover:bg-[#0c8a55] text-white font-bold px-6 py-2.5 rounded-md shadow-sm transition-colors text-sm cursor-pointer"
            >
              <FileCheck2 size={17} />
              <span>Thi thử 18 bộ đề</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="flex-1 max-w-5xl w-full mx-auto p-4 md:p-8 space-y-8">
        {/* Statistics Bar if user has taken tests */}
        {historyCount > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
            <div className="text-center p-2">
              <span className="text-xs text-slate-500 font-medium">Số lượt đã thi thử</span>
              <p className="text-2xl font-bold text-slate-900 mt-0.5">{historyCount} lượt</p>
            </div>
            <div className="text-center p-2 border-y sm:border-y-0 sm:border-x border-slate-100">
              <span className="text-xs text-slate-500 font-medium">Tỷ lệ đạt chuẩn (≥ 8.0đ)</span>
              <p className="text-2xl font-bold text-emerald-600 mt-0.5">
                {Math.round((passedCount / historyCount) * 100)}% ({passedCount}/{historyCount})
              </p>
            </div>
            <div className="text-center p-2">
              <span className="text-xs text-slate-500 font-medium">Điểm số cao nhất</span>
              <p className="text-2xl font-bold text-blue-700 mt-0.5">{highestScore.toFixed(2)} / 10.0</p>
            </div>
          </div>
        )}

        {/* 2 Main Entry Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Card 1: Ôn tập */}
          <div
            onClick={onGoToStudy}
            className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs hover:shadow-md hover:border-blue-400 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-blue-50 text-[#1b3a8c] flex items-center justify-center group-hover:bg-[#1b3a8c] group-hover:text-white transition-colors">
                <BookOpen size={24} />
              </div>
              <h2 className="text-lg font-bold text-slate-900 group-hover:text-[#1b3a8c] transition-colors">
                1. Ôn Tập Các Tình Huống Mô Phỏng
              </h2>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                Tra cứu và ôn luyện toàn bộ <strong>{SITUATIONS.length} tình huống giao thông</strong> qua video mô phỏng, nắm rõ 4 nội dung đánh giá: Nhận biết tên tình huống, dấu hiệu gián tiếp, dấu hiệu trực tiếp và phương án xử lý kịp thời.
              </p>
            </div>
            <div className="mt-5 flex items-center text-sm font-semibold text-[#1b3a8c] gap-1 group-hover:gap-2 transition-all">
              <span>Bắt đầu ôn tập ngay</span>
              <ArrowRight size={16} />
            </div>
          </div>

          {/* Card 2: Thi thử */}
          <div
            onClick={onGoToExamSelect}
            className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs hover:shadow-md hover:border-emerald-400 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-emerald-50 text-[#0fa968] flex items-center justify-center group-hover:bg-[#0fa968] group-hover:text-white transition-colors">
                <FileCheck2 size={24} />
              </div>
              <h2 className="text-lg font-bold text-slate-900 group-hover:text-[#0fa968] transition-colors">
                2. Thi Thử Sát Hạch (18 Bộ Đề)
              </h2>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                Làm bài thi thử với <strong>{EXAM_SETS.length} bộ đề chuẩn</strong> gồm 10 tình huống/đề, tính điểm theo thang điểm 10 chuẩn xác (0,25đ mỗi phần), đồng hồ đếm ngược 15 phút và chấm điểm chi tiết tức thì.
              </p>
            </div>
            <div className="mt-5 flex items-center text-sm font-semibold text-[#0fa968] gap-1 group-hover:gap-2 transition-all">
              <span>Chọn bộ đề thi thử</span>
              <ArrowRight size={16} />
            </div>
          </div>
        </div>

        {/* Structure & Scoring Rules Card (Matches prompt requirement a & b) */}
        <section className="bg-white rounded-xl border border-slate-200 p-5 md:p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <ShieldCheck size={22} className="text-[#1b3a8c]" />
            <h2 className="font-bold text-slate-900 text-base md:text-lg">
              Cơ Cấu Đề Thi & Quy Định Chấm Điểm
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm text-slate-700">
            <div className="space-y-2 bg-slate-50 p-3.5 rounded border border-slate-200/80">
              <h3 className="font-bold text-slate-900 text-sm">
                a) Cấu trúc đề kiểm tra:
              </h3>
              <ul className="space-y-1.5 list-disc list-inside leading-relaxed text-slate-600">
                <li>Đề kiểm tra được thiết kế dưới dạng <strong>10 câu hỏi mô phỏng</strong> các tình huống giao thông.</li>
                <li>Mỗi câu hỏi chứa <strong>01 tình huống tiềm ẩn nguy cơ mất an toàn giao thông</strong>.</li>
                <li>Mỗi câu hỏi có <strong>số điểm tối đa là 1 điểm</strong> và tối thiểu là 0 điểm.</li>
                <li>Tổng điểm toàn bài: <strong>10 điểm</strong>. Đạt yêu cầu sát hạch: <strong>≥ 8,0 / 10 điểm</strong>.</li>
              </ul>
            </div>

            <div className="space-y-2 bg-slate-50 p-3.5 rounded border border-slate-200/80">
              <h3 className="font-bold text-slate-900 text-sm">
                b) Thang điểm chi tiết từng câu:
              </h3>
              <div className="space-y-1.5 leading-relaxed">
                <div className="flex justify-between items-center py-1 border-b border-slate-200">
                  <span>• Nhận biết tên tình huống:</span>
                  <span className="font-bold text-blue-700 font-mono">0,25 điểm</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-200">
                  <span>• Trả lời được dấu hiệu nhận biết gián tiếp:</span>
                  <span className="font-bold text-blue-700 font-mono">0,25 điểm</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-200">
                  <span>• Trả lời được dấu hiệu nhận biết trực tiếp:</span>
                  <span className="font-bold text-blue-700 font-mono">0,25 điểm</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span>• Trả lời được phương án xử lý:</span>
                  <span className="font-bold text-blue-700 font-mono">0,25 điểm</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6 Chapters Outline (High value content for SEO & Learners) */}
        <section className="bg-white rounded-xl border border-slate-200 p-5 md:p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <BookOpen size={20} className="text-[#1b3a8c]" />
            <h2 className="font-bold text-slate-900 text-base md:text-lg">
              Phân Bổ 6 Chương 120 Tình Huống Mô Phỏng Giao Thông
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs md:text-sm">
            {CHAPTERS.map((ch) => (
              <div key={ch.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 space-y-1">
                <div className="font-bold text-slate-900">
                  Chương {ch.id}
                </div>
                <div className="text-slate-600 text-xs">
                  {ch.name.replace(/Chương \d+: /, '')}
                </div>
                <div className="text-[11px] text-blue-700 font-medium">
                  {ch.count} câu hỏi (Từ câu {ch.range[0]} đến {ch.range[1]})
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section for AI Search Engine Grounding (Google SGE, Perplexity, Gemini, ChatGPT) */}
        <section className="bg-white rounded-xl border border-slate-200 p-5 md:p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <HelpCircle size={20} className="text-[#1b3a8c]" />
            <h2 className="font-bold text-slate-900 text-base md:text-lg">
              Câu Hỏi Thường Gặp Khi Thi Mô Phỏng Giao Thông (FAQ)
            </h2>
          </div>

          <div className="space-y-3 text-xs md:text-sm text-slate-700">
            <div className="p-3 bg-slate-50 rounded border border-slate-200/80 space-y-1">
              <h3 className="font-bold text-slate-900">
                1. Bài thi mô phỏng giao thông gồm bao nhiêu câu và thời gian thi là bao lâu?
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Đề sát hạch mô phỏng gồm 10 câu hỏi ngẫu nhiên tương ứng 10 tình huống nguy hiểm. Thí sinh có thời gian làm bài là 15 phút.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded border border-slate-200/80 space-y-1">
              <h3 className="font-bold text-slate-900">
                2. Điểm đạt yêu cầu sát hạch mô phỏng là bao nhiêu?
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Thí sinh phải đạt từ <strong>8,0 / 10 điểm</strong> trở lên để được công nhận ĐẠT phần thi mô phỏng các tình huống giao thông đường bộ.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded border border-slate-200/80 space-y-1">
              <h3 className="font-bold text-slate-900">
                3. Thang điểm 4 nội dung trong từng câu hỏi được tính như thế nào?
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Mỗi câu hỏi có điểm tối đa 1 điểm, gồm 4 phần trắc nghiệm độc lập (mỗi phần 0,25 điểm): (1) Nhận biết tên tình huống; (2) Dấu hiệu nhận biết gián tiếp; (3) Dấu hiệu nhận biết trực tiếp; (4) Phương án xử lý phù hợp.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* SEO Footer */}
      <footer className="bg-slate-900 text-slate-400 py-6 px-4 text-xs text-center border-t border-slate-800 space-y-2">
        <p className="font-medium text-slate-300">
          HỆ THỐNG ÔN TẬP VÀ THI THỬ 120 TÌNH HUỐNG MÔ PHỎNG GIAO THÔNG
        </p>
        <p className="max-w-2xl mx-auto text-slate-500">
          Ứng dụng web tĩnh tối ưu hóa tốc độ cao, hỗ trợ học viên ôn luyện thi sát hạch giấy phép lái xe ô tô hạng B1, B2, C, D, E theo chuẩn Cục Đường Bộ Việt Nam.
        </p>
      </footer>
    </div>
  );
};
