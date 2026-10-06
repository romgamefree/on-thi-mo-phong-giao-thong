import React from 'react';
import { CheckCircle, XCircle, Award, RotateCcw, ArrowRight, Eye } from 'lucide-react';

export interface ScoreReport {
  totalScore: number;
  passed: boolean;
  part1Score: number;
  part2Score: number;
  part3Score: number;
  part4Score: number;
  questionScores: number[];
  timeTaken: string;
}

interface ExamResultModalProps {
  maDe: number;
  isOpen: boolean;
  report: ScoreReport;
  onReview: () => void;
  onRetake: () => void;
  onBackToSelect: () => void;
}

export const ExamResultModal: React.FC<ExamResultModalProps> = ({
  maDe,
  isOpen,
  report,
  onReview,
  onRetake,
  onBackToSelect,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div
          className={`px-6 py-5 text-center text-white ${
            report.passed ? 'bg-gradient-to-r from-emerald-600 to-teal-700' : 'bg-gradient-to-r from-red-600 to-rose-700'
          }`}
        >
          <div className="inline-flex p-3 rounded-full bg-white/20 mb-2">
            {report.passed ? <CheckCircle size={36} /> : <XCircle size={36} />}
          </div>
          <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wide">
            {report.passed ? 'KẾT QUẢ: ĐẠT SÁT HẠCH' : 'KẾT QUẢ: CHƯA ĐẠT'}
          </h2>
          <p className="text-xs md:text-sm text-white/90 mt-1">
            Đề thi số {maDe} · Thời gian hoàn thành: {report.timeTaken}
          </p>
        </div>

        {/* Score Body */}
        <div className="p-6 space-y-5">
          {/* Main Score Display */}
          <div className="text-center bg-slate-50 border border-slate-200 rounded-lg py-4 px-2">
            <span className="text-xs uppercase font-semibold text-slate-500 tracking-wider">
              Tổng điểm đạt được
            </span>
            <div className="text-4xl md:text-5xl font-extrabold text-slate-900 mt-1 tabular-nums">
              <span className={report.passed ? 'text-emerald-600' : 'text-red-600'}>
                {report.totalScore.toFixed(2)}
              </span>
              <span className="text-slate-400 text-2xl md:text-3xl font-medium"> / 10.0</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              (Điều kiện đạt: Từ 8,0 / 10 điểm trở lên)
            </p>
          </div>

          {/* Breakdown for each of 4 parts */}
          <div className="space-y-2.5 text-xs md:text-sm">
            <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
              Chi tiết điểm theo 4 nội dung đánh giá:
            </h4>

            <div className="grid grid-cols-2 gap-2 text-slate-700">
              <div className="bg-slate-50 p-2.5 rounded border border-slate-200 flex justify-between items-center">
                <span>1. Tên tình huống:</span>
                <span className="font-bold text-blue-700 font-mono">
                  {report.part1Score.toFixed(2)} / 2.50đ
                </span>
              </div>

              <div className="bg-slate-50 p-2.5 rounded border border-slate-200 flex justify-between items-center">
                <span>2. Dấu hiệu gián tiếp:</span>
                <span className="font-bold text-blue-700 font-mono">
                  {report.part2Score.toFixed(2)} / 2.50đ
                </span>
              </div>

              <div className="bg-slate-50 p-2.5 rounded border border-slate-200 flex justify-between items-center">
                <span>3. Dấu hiệu trực tiếp:</span>
                <span className="font-bold text-blue-700 font-mono">
                  {report.part3Score.toFixed(2)} / 2.50đ
                </span>
              </div>

              <div className="bg-slate-50 p-2.5 rounded border border-slate-200 flex justify-between items-center">
                <span>4. Phương án xử lý:</span>
                <span className="font-bold text-blue-700 font-mono">
                  {report.part4Score.toFixed(2)} / 2.50đ
                </span>
              </div>
            </div>
          </div>

          {/* Question grid score pills */}
          <div>
            <span className="text-xs font-semibold text-slate-600 block mb-2">
              Điểm số từng câu (10 câu):
            </span>
            <div className="grid grid-cols-5 gap-1.5 text-center text-xs">
              {report.questionScores.map((score, i) => (
                <div
                  key={i}
                  className={`py-1.5 px-1 rounded border font-mono font-semibold ${
                    score === 1
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                      : score > 0
                      ? 'bg-amber-50 border-amber-300 text-amber-800'
                      : 'bg-red-50 border-red-300 text-red-800'
                  }`}
                >
                  <div className="text-[10px] text-slate-500 font-normal">Câu {i + 1}</div>
                  <div>{score.toFixed(2)}đ</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex flex-col sm:flex-row gap-2.5 justify-end">
          <button
            onClick={onRetake}
            className="flex items-center justify-center gap-1.5 px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded text-sm font-medium transition-colors cursor-pointer"
          >
            <RotateCcw size={15} />
            <span>Thi lại</span>
          </button>

          <button
            onClick={onBackToSelect}
            className="flex items-center justify-center gap-1.5 px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded text-sm font-medium transition-colors cursor-pointer"
          >
            <span>Chọn bộ đề khác</span>
          </button>

          <button
            onClick={onReview}
            className="flex items-center justify-center gap-1.5 px-5 py-2 bg-[#1b3b8c] hover:bg-[#152e6e] text-white rounded text-sm font-bold shadow-xs transition-colors cursor-pointer"
          >
            <Eye size={16} />
            <span>Xem lại bài làm</span>
          </button>
        </div>
      </div>
    </div>
  );
};
