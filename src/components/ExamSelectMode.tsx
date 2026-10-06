import React from 'react';
import { EXAM_SETS } from '../data/examData';
import { CheckCircle2, Shuffle, Info, FileSpreadsheet } from 'lucide-react';

interface ExamSelectModeProps {
  onBackHome: () => void;
  onSelectExam: (maDe: number) => void;
  onSelectRandomExam: () => void;
  examHistory?: Record<number, { score: number; passed: boolean; timestamp: number }>;
}

export const ExamSelectMode: React.FC<ExamSelectModeProps> = ({
  onBackHome,
  onSelectExam,
  onSelectRandomExam,
  examHistory = {},
}) => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-56px)] bg-[#f4f7fa]">
      {/* Top Action Row Matching Screenshot 2 */}
      <div className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-xs">
        <button
          onClick={onBackHome}
          className="bg-slate-400 hover:bg-slate-500 text-white font-medium px-4 py-1.5 rounded text-sm transition-colors cursor-pointer"
        >
          Trang chủ
        </button>

        <h2 className="text-[#1b3b8c] text-lg md:text-xl font-bold tracking-wide uppercase text-center flex-1">
          THI THỬ - CHỌN BỘ ĐỀ
        </h2>

        <div className="w-[85px] hidden sm:block"></div>
      </div>

      {/* Main Container */}
      <div className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-8 flex flex-col items-center justify-center">
        {/* Guidelines Box */}
        <div className="w-full bg-blue-50/70 border border-blue-200 rounded-lg p-3.5 mb-6 text-xs md:text-sm text-slate-700 flex items-start gap-2.5">
          <Info size={18} className="text-[#1b3b8c] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-[#1b3b8c]">Quy cách bài kiểm tra mô phỏng:</p>
            <p>
              • Mỗi đề thi gồm <strong>10 tình huống</strong> mô phỏng (tổng điểm tối đa: <strong>10 điểm</strong>, mỗi câu tối đa <strong>1 điểm</strong>).
            </p>
            <p>
              • Mỗi câu hỏi gồm 4 phần: <em>Tên tình huống (0,25đ)</em>, <em>Dấu hiệu gián tiếp (0,25đ)</em>, <em>Dấu hiệu trực tiếp (0,25đ)</em>, <em>Phương án xử lý (0,25đ)</em>.
            </p>
            <p>
              • Thời gian làm bài: <strong>15 phút</strong>. Điểm đạt yêu cầu sát hạch: <strong>≥ 8,0 / 10 điểm</strong>.
            </p>
          </div>
        </div>

        {/* Grid of 18 Green Exam Buttons (Matches screenshot 2) */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4 mb-8">
          {EXAM_SETS.map((exam) => {
            const history = examHistory[exam.maDe];
            return (
              <div key={exam.maDe} className="relative group">
                <button
                  onClick={() => onSelectExam(exam.maDe)}
                  className="w-full py-3.5 px-3 bg-[#0fa968] hover:bg-[#0c8a55] active:bg-[#0a7548] text-white font-bold text-base md:text-lg rounded-md shadow-sm transition-all duration-150 transform hover:-translate-y-0.5 cursor-pointer flex flex-col items-center justify-center gap-1"
                >
                  <span>Đề {exam.maDe}</span>
                  {history && (
                    <span
                      className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                        history.passed ? 'bg-emerald-900/40 text-emerald-100' : 'bg-red-900/40 text-red-100'
                      }`}
                    >
                      {history.score.toFixed(2)}đ ({history.passed ? 'Đạt' : 'Trượt'})
                    </span>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Random Exam Option */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onSelectRandomExam}
            className="flex items-center gap-2 bg-[#1b3b8c] hover:bg-[#152e6e] text-white font-semibold px-6 py-2.5 rounded-md shadow-sm transition-colors text-sm cursor-pointer"
          >
            <Shuffle size={16} />
            <span>Thi ngẫu nhiên (Chọn 10 câu ngẫu nhiên)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
