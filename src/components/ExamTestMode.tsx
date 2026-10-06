import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  EXAM_SETS,
  SITUATIONS,
  Situation,
  generateQuestionParts,
  QuestionParts,
} from '../data/examData';
import { VideoPlayer } from './VideoPlayer';
import { ExamResultModal, ScoreReport } from './ExamResultModal';
import { Clock, Check, X, AlertCircle } from 'lucide-react';

interface ExamTestModeProps {
  maDe: number;
  onBackToSelect: () => void;
  onSaveHistory?: (maDe: number, score: number, passed: boolean) => void;
}

interface QuestionAnswers {
  part1?: string; // 'A' | 'B' | 'C'
  part2?: string;
  part3?: string;
  part4?: string;
}

export const ExamTestMode: React.FC<ExamTestModeProps> = ({
  maDe,
  onBackToSelect,
  onSaveHistory,
}) => {
  // Find exam set or fallback to 10 random questions
  const examSet = useMemo(() => {
    return EXAM_SETS.find((e) => e.maDe === maDe) || EXAM_SETS[0];
  }, [maDe]);

  // Questions in this exam
  const examQuestions: Situation[] = useMemo(() => {
    return examSet.questions.map((id) => {
      const found = SITUATIONS.find((s) => s.id === id);
      return (
        found || {
          id,
          name: `Tình huống ${id}`,
          indirect: 'Quan sát chướng ngại vật từ xa',
          direct: 'Chướng ngại vật xuất hiện',
          action: 'Giảm tốc, giữ khoảng cách an toàn',
          video: `VIDEO_MO_PHONG_THGT/chuong_1/1.mp4`,
        }
      );
    });
  }, [examSet]);

  // Pre-generate options for all 10 questions so choices stay stable
  const pregeneratedParts = useMemo(() => {
    const map: Record<number, QuestionParts> = {};
    examQuestions.forEach((q) => {
      map[q.id] = generateQuestionParts(q, maDe);
    });
    return map;
  }, [examQuestions, maDe]);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, QuestionAnswers>>({});
  const [timeLeft, setTimeLeft] = useState<number>(15 * 60); // 15 minutes = 900 seconds
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showResultModal, setShowResultModal] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [report, setReport] = useState<ScoreReport | null>(null);

  // Timer countdown
  useEffect(() => {
    if (isSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted]);

  // Current Question
  const currentQuestion = examQuestions[currentIndex];
  const currentParts = pregeneratedParts[currentQuestion.id];
  const currentAnswer = answers[currentIndex] || {};

  // Handle radio change
  const handleSelectOption = (
    partKey: 'part1' | 'part2' | 'part3' | 'part4',
    label: string
  ) => {
    if (isSubmitted) return; // Cannot edit after submission

    setAnswers((prev) => ({
      ...prev,
      [currentIndex]: {
        ...prev[currentIndex],
        [partKey]: label,
      },
    }));
  };

  // Compute status for bottom question tabs
  const getQuestionStatus = (idx: number) => {
    if (idx === currentIndex) return 'active'; // Đang làm

    const ans = answers[idx];
    if (!ans) return 'untouched'; // Chưa làm

    const count =
      (ans.part1 ? 1 : 0) +
      (ans.part2 ? 1 : 0) +
      (ans.part3 ? 1 : 0) +
      (ans.part4 ? 1 : 0);

    if (count === 4) return 'full'; // Đã làm đủ 4 phần
    if (count > 0) return 'partial'; // Làm thiếu
    return 'untouched'; // Chưa làm
  };

  // Format time MM:SS
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Submit and calculate score
  const handleSubmitExam = () => {
    let totalScore = 0;
    let part1Score = 0;
    let part2Score = 0;
    let part3Score = 0;
    let part4Score = 0;
    const questionScores: number[] = [];

    examQuestions.forEach((q, idx) => {
      const ans = answers[idx] || {};
      const parts = pregeneratedParts[q.id];

      let qScore = 0;

      // Part 1
      const p1Correct = parts.part1.find((o) => o.isCorrect)?.label;
      if (ans.part1 && ans.part1 === p1Correct) {
        qScore += 0.25;
        part1Score += 0.25;
      }

      // Part 2
      const p2Correct = parts.part2.find((o) => o.isCorrect)?.label;
      if (ans.part2 && ans.part2 === p2Correct) {
        qScore += 0.25;
        part2Score += 0.25;
      }

      // Part 3
      const p3Correct = parts.part3.find((o) => o.isCorrect)?.label;
      if (ans.part3 && ans.part3 === p3Correct) {
        qScore += 0.25;
        part3Score += 0.25;
      }

      // Part 4
      const p4Correct = parts.part4.find((o) => o.isCorrect)?.label;
      if (ans.part4 && ans.part4 === p4Correct) {
        qScore += 0.25;
        part4Score += 0.25;
      }

      questionScores.push(qScore);
      totalScore += qScore;
    });

    const timeSpentSecs = 15 * 60 - timeLeft;
    const timeTakenStr = formatTime(timeSpentSecs);
    const passed = totalScore >= 8.0;

    const rep: ScoreReport = {
      totalScore,
      passed,
      part1Score,
      part2Score,
      part3Score,
      part4Score,
      questionScores,
      timeTaken: timeTakenStr,
    };

    setReport(rep);
    setIsSubmitted(true);
    setShowConfirmModal(false);
    setShowResultModal(true);

    if (onSaveHistory) {
      onSaveHistory(maDe, totalScore, passed);
    }
  };

  const handleRetakeExam = () => {
    setAnswers({});
    setCurrentIndex(0);
    setTimeLeft(15 * 60);
    setIsSubmitted(false);
    setShowResultModal(false);
    setReport(null);
  };

  // Count answered questions for warning modal
  const completedCount = useMemo(() => {
    return Object.values(answers).filter(
      (a) => a.part1 && a.part2 && a.part3 && a.part4
    ).length;
  }, [answers]);

  return (
    <div className="flex flex-col min-h-[calc(100vh-56px)] bg-[#f8fafc]">
      {/* Sub-bar matching Screenshot 3 */}
      <div className="bg-white border-b border-slate-200 px-3 md:px-6 py-2.5 flex flex-wrap items-center justify-between gap-2 shadow-xs">
        {/* Left student info & Quay lại button */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              if (!isSubmitted && Object.keys(answers).length > 0) {
                if (window.confirm('Bạn đang làm bài thi. Bạn có chắc muốn quay lại màn hình chọn bộ đề không?')) {
                  onBackToSelect();
                }
              } else {
                onBackToSelect();
              }
            }}
            className="bg-slate-400 hover:bg-slate-500 text-white font-medium px-3.5 py-1.5 rounded text-xs md:text-sm transition-colors cursor-pointer shrink-0"
          >
            Quay lại
          </button>

          <div className="text-xs md:text-sm text-slate-700 font-medium">
            Học viên: <span className="font-semibold text-slate-900">Khách (Ôn tập)</span> | SBD:{' '}
            <span className="font-mono font-semibold">0000</span> | Đề thi số:{' '}
            <span className="font-semibold text-blue-800">{maDe}</span> | Câu:{' '}
            <span className="font-bold text-slate-900">{currentIndex + 1} / 10</span>
          </div>
        </div>

        {/* Center Title */}
        <h2 className="text-[#1b3b8c] text-sm md:text-base font-bold tracking-wide uppercase text-center order-first md:order-none w-full md:w-auto">
          BÀI KIỂM TRA MÔ PHỎNG TÌNH HUỐNG GIAO THÔNG
        </h2>

        {/* Right Countdown Timer */}
        <div className="flex items-center gap-2">
          <div className="bg-[#ef4444] text-white px-3 py-1 rounded text-xs md:text-sm font-bold flex items-center gap-1.5 shadow-xs tabular-nums">
            <Clock size={14} />
            <span>Thời gian: {formatTime(timeLeft)}</span>
          </div>

          {isSubmitted && (
            <button
              onClick={() => setShowResultModal(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1 rounded text-xs font-semibold cursor-pointer"
            >
              Xem điểm ({report?.totalScore.toFixed(2)}đ)
            </button>
          )}
        </div>
      </div>

      {/* Main Examination View: 2 Columns */}
      <div className="flex-1 max-w-[1600px] w-full mx-auto p-3 md:p-4 grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Column: Video & Nav (approx 7 cols) */}
        <div className="lg:col-span-7 xl:col-span-7 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-base md:text-lg">
              Câu {currentIndex + 1}
            </h3>
            {isSubmitted && report && (
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-mono">
                Điểm câu này: {report.questionScores[currentIndex].toFixed(2)} / 1.00đ
              </span>
            )}
          </div>

          {/* Video Player */}
          <VideoPlayer situation={currentQuestion} isExamMode={true} />

          {/* Under Video Actions (Matches Screenshot 3) */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentIndex === 0}
                className={`px-3 py-1.5 rounded text-xs md:text-sm font-medium transition-colors cursor-pointer ${
                  currentIndex === 0
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                }`}
              >
                Câu trước
              </button>

              <button
                onClick={() => setCurrentIndex((prev) => Math.min(9, prev + 1))}
                disabled={currentIndex === 9}
                className={`px-3 py-1.5 rounded text-xs md:text-sm font-medium transition-colors cursor-pointer ${
                  currentIndex === 9
                    ? 'bg-blue-300 text-white cursor-not-allowed'
                    : 'bg-[#60a5fa] hover:bg-blue-500 text-white'
                }`}
              >
                Câu tiếp theo
              </button>
            </div>

            {!isSubmitted ? (
              <button
                onClick={() => setShowConfirmModal(true)}
                className="bg-[#ef4444] hover:bg-[#dc2626] active:bg-[#b91c1c] text-white font-bold px-5 py-1.5 rounded text-xs md:text-sm shadow-sm transition-colors cursor-pointer"
              >
                Nộp bài
              </button>
            ) : (
              <button
                onClick={() => setShowResultModal(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-1.5 rounded text-xs md:text-sm shadow-sm transition-colors cursor-pointer"
              >
                Xem tổng kết điểm
              </button>
            )}
          </div>
        </div>

        {/* Right Column: 4 Question Parts (approx 5 cols, matching screenshot 3) */}
        <div className="lg:col-span-5 xl:col-span-5 flex flex-col gap-3">
          {/* Part 1 */}
          <div className="bg-white border border-slate-200 rounded p-3 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-slate-900 text-xs md:text-sm">
                Phần 1: Nhận biết tên tình huống
              </h4>
              <span className="text-[11px] text-slate-500 font-medium">(0,25 điểm)</span>
            </div>
            <div className="space-y-1.5 text-xs md:text-sm text-slate-800">
              {currentParts.part1.map((opt) => {
                const isSelected = currentAnswer.part1 === opt.label;
                const isCorrect = opt.isCorrect;

                return (
                  <label
                    key={opt.label}
                    className={`flex items-start gap-2.5 p-2 rounded transition-colors cursor-pointer ${
                      isSelected ? 'bg-blue-50/70 border border-blue-200' : 'hover:bg-slate-50 border border-transparent'
                    } ${
                      isSubmitted && isCorrect
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                        : ''
                    } ${
                      isSubmitted && isSelected && !isCorrect
                        ? 'bg-red-50 border-red-300 text-red-900'
                        : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name={`part1-${currentIndex}`}
                      checked={isSelected}
                      disabled={isSubmitted}
                      onChange={() => handleSelectOption('part1', opt.label)}
                      className="mt-0.5 accent-blue-600"
                    />
                    <span className="leading-snug">
                      <span className="font-semibold mr-1">{opt.label}.</span>
                      {opt.text}
                    </span>
                    {isSubmitted && isCorrect && (
                      <Check size={15} className="text-emerald-600 ml-auto shrink-0 mt-0.5" />
                    )}
                    {isSubmitted && isSelected && !isCorrect && (
                      <X size={15} className="text-red-600 ml-auto shrink-0 mt-0.5" />
                    )}
                  </label>
                );
              })}
            </div>
          </div>

          {/* Part 2 */}
          <div className="bg-white border border-slate-200 rounded p-3 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-slate-900 text-xs md:text-sm">
                Phần 2: Dấu hiệu nhận biết gián tiếp
              </h4>
              <span className="text-[11px] text-slate-500 font-medium">(0,25 điểm)</span>
            </div>
            <div className="space-y-1.5 text-xs md:text-sm text-slate-800">
              {currentParts.part2.map((opt) => {
                const isSelected = currentAnswer.part2 === opt.label;
                const isCorrect = opt.isCorrect;

                return (
                  <label
                    key={opt.label}
                    className={`flex items-start gap-2.5 p-2 rounded transition-colors cursor-pointer ${
                      isSelected ? 'bg-blue-50/70 border border-blue-200' : 'hover:bg-slate-50 border border-transparent'
                    } ${
                      isSubmitted && isCorrect
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                        : ''
                    } ${
                      isSubmitted && isSelected && !isCorrect
                        ? 'bg-red-50 border-red-300 text-red-900'
                        : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name={`part2-${currentIndex}`}
                      checked={isSelected}
                      disabled={isSubmitted}
                      onChange={() => handleSelectOption('part2', opt.label)}
                      className="mt-0.5 accent-blue-600"
                    />
                    <span className="leading-snug">
                      <span className="font-semibold mr-1">{opt.label}.</span>
                      {opt.text}
                    </span>
                    {isSubmitted && isCorrect && (
                      <Check size={15} className="text-emerald-600 ml-auto shrink-0 mt-0.5" />
                    )}
                    {isSubmitted && isSelected && !isCorrect && (
                      <X size={15} className="text-red-600 ml-auto shrink-0 mt-0.5" />
                    )}
                  </label>
                );
              })}
            </div>
          </div>

          {/* Part 3 */}
          <div className="bg-white border border-slate-200 rounded p-3 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-slate-900 text-xs md:text-sm">
                Phần 3: Dấu hiệu nhận biết trực tiếp
              </h4>
              <span className="text-[11px] text-slate-500 font-medium">(0,25 điểm)</span>
            </div>
            <div className="space-y-1.5 text-xs md:text-sm text-slate-800">
              {currentParts.part3.map((opt) => {
                const isSelected = currentAnswer.part3 === opt.label;
                const isCorrect = opt.isCorrect;

                return (
                  <label
                    key={opt.label}
                    className={`flex items-start gap-2.5 p-2 rounded transition-colors cursor-pointer ${
                      isSelected ? 'bg-blue-50/70 border border-blue-200' : 'hover:bg-slate-50 border border-transparent'
                    } ${
                      isSubmitted && isCorrect
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                        : ''
                    } ${
                      isSubmitted && isSelected && !isCorrect
                        ? 'bg-red-50 border-red-300 text-red-900'
                        : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name={`part3-${currentIndex}`}
                      checked={isSelected}
                      disabled={isSubmitted}
                      onChange={() => handleSelectOption('part3', opt.label)}
                      className="mt-0.5 accent-blue-600"
                    />
                    <span className="leading-snug">
                      <span className="font-semibold mr-1">{opt.label}.</span>
                      {opt.text}
                    </span>
                    {isSubmitted && isCorrect && (
                      <Check size={15} className="text-emerald-600 ml-auto shrink-0 mt-0.5" />
                    )}
                    {isSubmitted && isSelected && !isCorrect && (
                      <X size={15} className="text-red-600 ml-auto shrink-0 mt-0.5" />
                    )}
                  </label>
                );
              })}
            </div>
          </div>

          {/* Part 4 */}
          <div className="bg-white border border-slate-200 rounded p-3 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-slate-900 text-xs md:text-sm">
                Phần 4: Phương án xử lý phù hợp
              </h4>
              <span className="text-[11px] text-slate-500 font-medium">(0,25 điểm)</span>
            </div>
            <div className="space-y-1.5 text-xs md:text-sm text-slate-800">
              {currentParts.part4.map((opt) => {
                const isSelected = currentAnswer.part4 === opt.label;
                const isCorrect = opt.isCorrect;

                return (
                  <label
                    key={opt.label}
                    className={`flex items-start gap-2.5 p-2 rounded transition-colors cursor-pointer ${
                      isSelected ? 'bg-blue-50/70 border border-blue-200' : 'hover:bg-slate-50 border border-transparent'
                    } ${
                      isSubmitted && isCorrect
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                        : ''
                    } ${
                      isSubmitted && isSelected && !isCorrect
                        ? 'bg-red-50 border-red-300 text-red-900'
                        : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name={`part4-${currentIndex}`}
                      checked={isSelected}
                      disabled={isSubmitted}
                      onChange={() => handleSelectOption('part4', opt.label)}
                      className="mt-0.5 accent-blue-600"
                    />
                    <span className="leading-snug">
                      <span className="font-semibold mr-1">{opt.label}.</span>
                      {opt.text}
                    </span>
                    {isSubmitted && isCorrect && (
                      <Check size={15} className="text-emerald-600 ml-auto shrink-0 mt-0.5" />
                    )}
                    {isSubmitted && isSelected && !isCorrect && (
                      <X size={15} className="text-red-600 ml-auto shrink-0 mt-0.5" />
                    )}
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row Question Navigation & Legend (Exact matching Screenshot 3) */}
      <div className="bg-white border-t border-slate-200 p-3 md:p-4 mt-auto">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-3">
          {/* Horizontal List of 10 Question Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            {examQuestions.map((_, idx) => {
              const status = getQuestionStatus(idx);
              let btnClass = 'bg-[#85929e] text-white'; // gray default

              if (status === 'active') {
                btnClass = 'bg-[#2563eb] text-white ring-2 ring-blue-300 font-bold'; // blue
              } else if (status === 'full') {
                btnClass = 'bg-[#10b981] text-white font-semibold'; // green
              } else if (status === 'partial') {
                btnClass = 'bg-[#f59e0b] text-white font-semibold'; // yellow/amber
              } else {
                btnClass = 'bg-[#85929e] text-white'; // gray
              }

              return (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`px-3 py-1.5 rounded text-xs md:text-sm transition-all cursor-pointer shadow-xs min-w-[62px] text-center ${btnClass}`}
                >
                  Câu {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Legend Matching Screenshot 3 */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-700 pt-1 select-none">
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-3.5 h-3.5 bg-[#2563eb] rounded-xs"></span>
              <span>Đang làm</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-3.5 h-3.5 bg-[#10b981] rounded-xs"></span>
              <span>Đã làm đủ 4 phần</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-3.5 h-3.5 bg-[#f59e0b] rounded-xs"></span>
              <span>Làm thiếu</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-3.5 h-3.5 bg-[#85929e] rounded-xs"></span>
              <span>Chưa làm</span>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal when clicking Nộp bài */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center gap-3 text-amber-600">
              <AlertCircle size={28} />
              <h3 className="text-lg font-bold text-slate-900">Xác nhận nộp bài</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Bạn đã hoàn thành đầy đủ <strong>{completedCount} / 10 câu</strong>.
              {completedCount < 10 && (
                <span className="text-amber-700 block mt-1">
                  Vẫn còn {10 - completedCount} câu chưa làm xong 4 phần. Bạn có chắc chắn muốn nộp bài ngay bây giờ?
                </span>
              )}
            </p>
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 rounded text-sm font-medium cursor-pointer"
              >
                Tiếp tục làm bài
              </button>
              <button
                onClick={handleSubmitExam}
                className="px-5 py-2 bg-[#ef4444] hover:bg-red-700 text-white rounded text-sm font-bold shadow-xs cursor-pointer"
              >
                Đồng ý nộp bài
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Result Modal */}
      {report && (
        <ExamResultModal
          maDe={maDe}
          isOpen={showResultModal}
          report={report}
          onReview={() => setShowResultModal(false)}
          onRetake={handleRetakeExam}
          onBackToSelect={onBackToSelect}
        />
      )}
    </div>
  );
};
