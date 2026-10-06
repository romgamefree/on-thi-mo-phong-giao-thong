import React, { useState, useMemo } from 'react';
import { SITUATIONS, CHAPTERS, Situation } from '../data/examData';
import { VideoPlayer } from './VideoPlayer';
import { Search, ChevronRight } from 'lucide-react';

interface StudyModeProps {
  onBack: () => void;
  onGoToExams: () => void;
}

export const StudyMode: React.FC<StudyModeProps> = ({ onBack, onGoToExams }) => {
  const [selectedId, setSelectedId] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedChapter, setSelectedChapter] = useState<number>(0); // 0 = all

  const filteredSituations = useMemo(() => {
    return SITUATIONS.filter((item) => {
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toString().includes(searchQuery) ||
        item.action.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchSearch) return false;

      if (selectedChapter === 0) return true;
      const chapter = CHAPTERS.find((c) => c.id === selectedChapter);
      if (!chapter) return true;
      return item.id >= chapter.range[0] && item.id <= chapter.range[1];
    });
  }, [searchQuery, selectedChapter]);

  const currentSituation: Situation = useMemo(() => {
    return SITUATIONS.find((s) => s.id === selectedId) || SITUATIONS[0];
  }, [selectedId]);

  return (
    <div className="flex flex-col min-h-[calc(100vh-56px)] bg-[#f1f5f9]">
      {/* Top action row matching screenshot 1 */}
      <div className="bg-white border-b border-slate-200 px-4 py-2.5 flex items-center justify-between shadow-xs">
        <button
          onClick={onBack}
          className="bg-slate-400 hover:bg-slate-500 text-white font-medium px-4 py-1.5 rounded text-sm transition-colors cursor-pointer"
        >
          Quay lại
        </button>

        <h2 className="text-[#1b3b8c] text-base md:text-lg font-bold tracking-wide uppercase text-center flex-1">
          ÔN TẬP CÁC TÌNH HUỐNG MÔ PHỎNG
        </h2>

        <button
          onClick={onGoToExams}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-3.5 py-1.5 rounded text-xs md:text-sm transition-colors cursor-pointer"
        >
          Thi thử
        </button>
      </div>

      {/* Main Layout: 2 Columns */}
      <div className="flex-1 max-w-[1600px] w-full mx-auto p-3 md:p-4 grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Column: Situation List (Matching original screenshot 1) */}
        <div className="lg:col-span-4 xl:col-span-3 bg-white border border-slate-300 rounded shadow-xs flex flex-col h-[520px] lg:h-[calc(100vh-140px)]">
            {/* Filter & Search Header */}
            <div className="p-2.5 border-b border-slate-200 bg-slate-50 space-y-2 shrink-0">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 text-slate-400" size={15} />
                <input
                  type="text"
                  placeholder="Tìm tình huống..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Chapter filter */}
              <select
                value={selectedChapter}
                onChange={(e) => setSelectedChapter(Number(e.target.value))}
                className="w-full text-xs py-1.5 px-2 bg-white border border-slate-300 rounded text-slate-700 focus:outline-none"
              >
                <option value={0}>Tất cả các chương (120 tình huống)</option>
                {CHAPTERS.map((ch) => (
                  <option key={ch.id} value={ch.id}>
                    Chương {ch.id}: {ch.name.replace(/Chương \d+: /, '')} ({ch.count} câu)
                  </option>
                ))}
              </select>
            </div>

            {/* Scrollable list items */}
            <div className="flex-1 overflow-y-auto divide-y divide-slate-100 text-sm">
              {filteredSituations.map((item) => {
                const isSelected = item.id === selectedId;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    className={`w-full text-left px-3 py-2.5 transition-colors flex items-center justify-between text-xs md:text-sm cursor-pointer ${
                      isSelected
                        ? 'bg-[#bde3f7] font-semibold text-slate-900 border-l-4 border-blue-600'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span className="truncate pr-2">
                      Tình huống {item.id}: {item.name}
                    </span>
                    {isSelected && <ChevronRight size={14} className="text-blue-700 shrink-0" />}
                  </button>
                );
              })}

              {filteredSituations.length === 0 && (
                <div className="p-6 text-center text-xs text-slate-500">
                  Không tìm thấy tình huống phù hợp.
                </div>
              )}
            </div>
        </div>

        {/* Right Column: Video & Answer Suggestion (Matching screenshot 1) */}
        <div className="lg:col-span-8 xl:col-span-9 flex flex-col gap-4">
          {/* Video Player */}
          <VideoPlayer situation={currentSituation} showAnswerOverlay={true} />

          {/* Answer Suggestion Box (Matches "ĐÁP ÁN (GỢI Ý):" in screenshot 1) */}
          <div className="bg-white border border-slate-300 rounded shadow-xs p-4 md:p-5">
            <h3 className="font-bold text-slate-900 text-sm md:text-base tracking-wide uppercase mb-3">
              ĐÁP ÁN (GỢI Ý):
            </h3>

            <div className="space-y-2 text-xs md:text-sm leading-relaxed text-slate-800">
              <div>
                <span className="font-semibold text-slate-900">- Nhận biết tình huống: </span>
                <span>Tình huống {currentSituation.id}: {currentSituation.name}</span>
              </div>

              <div>
                <span className="font-semibold text-slate-900">- Dấu hiệu gián tiếp: </span>
                <span>{currentSituation.indirect}</span>
              </div>

              <div>
                <span className="font-semibold text-slate-900">- Dấu hiệu trực tiếp: </span>
                <span>{currentSituation.direct}</span>
              </div>

              <div>
                <span className="font-semibold text-slate-900">- Xử lý: </span>
                <span>{currentSituation.action}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
