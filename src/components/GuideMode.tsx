import React, { useState } from 'react';
import { BookOpen, CheckCircle2, AlertTriangle, Lightbulb, Compass, Award, ShieldAlert, ArrowRight } from 'lucide-react';
import { CHAPTERS } from '../data/examData';

interface GuideModeProps {
  onGoToStudy: () => void;
  onGoToExams: () => void;
  onGoHome: () => void;
}

export const GuideMode: React.FC<GuideModeProps> = ({ onGoToStudy, onGoToExams, onGoHome }) => {
  const [activeTab, setActiveTab] = useState<'tips' | 'scoring' | 'chapters'>('tips');

  return (
    <div className="flex flex-col min-h-[calc(100vh-56px)] bg-[#f8fafc]">
      {/* Top Breadcrumb & Title */}
      <div className="bg-white border-b border-slate-200 px-4 py-3 shadow-xs">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <button onClick={onGoHome} className="hover:text-blue-700 cursor-pointer">Trang chủ</button>
            <span>/</span>
            <span className="text-slate-900 font-semibold">Hướng dẫn & Mẹo thi mô phỏng</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onGoToStudy}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-xs font-semibold cursor-pointer transition-colors"
            >
              Vào Ôn tập
            </button>
            <button
              onClick={onGoToExams}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded text-xs font-semibold cursor-pointer transition-colors"
            >
              Vào Thi thử 18 đề
            </button>
          </div>
        </div>
      </div>

      {/* Main Guide Content */}
      <div className="flex-1 max-w-5xl w-full mx-auto p-4 md:p-8 space-y-8">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-[#1b3a8c] to-[#0f245c] text-white rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="max-w-2xl space-y-3">
            <span className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-200 border border-blue-400/30 text-xs px-3 py-1 rounded-full font-medium">
              <Lightbulb size={14} className="text-amber-300" />
              CẨM NANG ÔN THI ĐẠT ĐIỂM TỐI ĐA 10/10
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Bí Quyết Nhận Diện Nguy Cơ & Đạt Trọn 1,0 Điểm / Tình Huống
            </h1>
            <p className="text-xs md:text-sm text-blue-100/90 leading-relaxed">
              Tổng hợp phương pháp phân tích 4 nội dung cốt lõi của bài sát hạch mô phỏng: từ nhận biết tên tình huống, bắt tín hiệu gián tiếp từ xa đến dấu hiệu trực tiếp và phương án xử lý lái xe an toàn theo chuẩn Cục Đường Bộ Việt Nam.
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 gap-2 md:gap-4 text-xs md:text-sm font-semibold">
          <button
            onClick={() => setActiveTab('tips')}
            className={`pb-3 px-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'tips'
                ? 'border-blue-700 text-blue-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            1. Mẹo 4 nội dung đánh giá
          </button>
          <button
            onClick={() => setActiveTab('chapters')}
            className={`pb-3 px-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'chapters'
                ? 'border-blue-700 text-blue-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            2. Trọng tâm 6 chương sát hạch
          </button>
          <button
            onClick={() => setActiveTab('scoring')}
            className={`pb-3 px-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'scoring'
                ? 'border-blue-700 text-blue-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            3. Quy tắc tính điểm & Tránh bẫy
          </button>
        </div>

        {/* Tab 1: Tips */}
        {activeTab === 'tips' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Part 1 */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs">
                    01
                  </span>
                  <h3 className="font-bold text-slate-900 text-base">
                    Phần 1: Nhận biết tên tình huống (0,25đ)
                  </h3>
                </div>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                  <strong>Mẹo xác định:</strong> Hãy chú ý đối tượng hoặc chướng ngại vật nổi bật nhất trong khung hình làm thay đổi quỹ đạo di chuyển của xe bạn.
                </p>
                <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                  <li>Nếu có xe lớn che khuất: chú ý xe máy hoặc người đi bộ phía sau.</li>
                  <li>Nếu là ngã ba, ngã tư hoặc ngõ hẹp: chú ý phương tiện nhô đầu ra từ đường nhánh.</li>
                  <li>Nếu ở cao tốc: chú ý phương tiện nhập làn gấp, chuyển làn không xi-nhan hoặc xe đi lùi.</li>
                </ul>
              </div>

              {/* Part 2 */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs">
                    02
                  </span>
                  <h3 className="font-bold text-slate-900 text-base">
                    Phần 2: Dấu hiệu gián tiếp (0,25đ)
                  </h3>
                </div>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                  <strong>Mẹo xác định:</strong> Đây là các dấu hiệu cảnh báo môi trường xuất hiện trước khi nguy cơ xảy ra, bao gồm:
                </p>
                <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                  <li>Biển báo nguy hiểm: công trường thi công, đường trơn, khúc cua gấp, súc vật qua đường.</li>
                  <li>Xe đi trước có dấu hiệu bất thường: chạy không đều, lấn sát vạch hoặc khoảng cách rút ngắn.</li>
                  <li>Điều kiện thời tiết: sương mù dày, trời mưa, trời tối hạn chế tầm nhìn xa.</li>
                </ul>
              </div>

              {/* Part 3 */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs">
                    03
                  </span>
                  <h3 className="font-bold text-slate-900 text-base">
                    Phần 3: Dấu hiệu trực tiếp (0,25đ)
                  </h3>
                </div>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                  <strong>Mẹo xác định:</strong> Khoảnh khắc mấu chốt bắt đầu xuất hiện rủi ro va chạm rõ rệt nhất:
                </p>
                <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                  <li>Đèn phanh xe phía trước bật sáng đột ngột màu đỏ rực.</li>
                  <li>Đầu xe từ đường nhánh đâm ngang qua mép làn đường chính.</li>
                  <li>Người đi bộ hoặc động vật đặt chân/bước chân xuống lòng đường xe chạy.</li>
                  <li>Cửa xe bên đường bất ngờ hé mở hoặc người chuẩn bị bước xuống.</li>
                </ul>
              </div>

              {/* Part 4 */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs">
                    04
                  </span>
                  <h3 className="font-bold text-slate-900 text-base">
                    Phần 4: Phương án xử lý phù hợp (0,25đ)
                  </h3>
                </div>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                  <strong>Mẹo chọn đáp án:</strong> Các đáp án chuẩn luôn đề cao an toàn, phòng ngừa từ xa và tuân thủ luật:
                </p>
                <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                  <li>Ưu tiên: "Giảm tốc độ chủ động", "rà phanh giữ khoảng cách an toàn", "chú ý quan sát".</li>
                  <li>Tránh: "Tăng tốc vượt nhanh", "bấm còi liên tục", "phanh gấp đột ngột khi không cần thiết".</li>
                  <li>Khi gặp người đi bộ hoặc xe ưu tiên: luôn ưu tiên nhường đường theo đúng quy định.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Chapters Breakdown */}
        {activeTab === 'chapters' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CHAPTERS.map((ch) => (
                <div key={ch.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-2.5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="font-bold text-slate-900 text-sm md:text-base">
                      Chương {ch.id}: {ch.name.replace(/Chương \d+: /, '')}
                    </span>
                    <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs font-semibold">
                      {ch.count} câu ({ch.range[0]} - {ch.range[1]})
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {ch.id === 1 && 'Tập trung vào các tình huống thường gặp trong khu đông dân cư: người đi bộ băng qua đường, xe rẽ nhánh, xe đỗ mở cửa, giao lộ đèn đỏ sang xanh.'}
                    {ch.id === 2 && 'Môi trường nông thôn, đường liên tỉnh: gia súc bất ngờ qua đường, khúc cua khuất, xe máy đi ra từ đường làng thiếu quan sát.'}
                    {ch.id === 3 && 'Tốc độ cao trên đường cao tốc: xe chuyển làn ẩu, xe tải phanh gấp, xe cứu thương xin vượt, chướng ngại vật rơi vãi hoặc xe lùi trên cao tốc.'}
                    {ch.id === 4 && 'Đường đèo dốc quanh co: sương mù dày, xe đối diện lấn làn trong đường cong, vật liệu rơi ở khúc cua núi.'}
                    {ch.id === 5 && 'Đường quốc lộ hỗn hợp: xe khách vượt ẩu, xe công nghệ tấp lề đón trả khách, trẻ em chạy qua đường gần trường học.'}
                    {ch.id === 6 && 'Các vụ tai nạn điển hình có thật: mất phanh đổ đèo, đâm liên hoàn trên cao tốc, vượt đèn đỏ tại giao lộ lớn.'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Scoring Rules */}
        {activeTab === 'scoring' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4 text-xs md:text-sm text-slate-700">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ShieldAlert className="text-blue-700" size={20} />
              Quy Chế Chấm Điểm & Điều Kiện Đạt Sát Hạch
            </h3>
            <div className="space-y-3 leading-relaxed text-slate-600">
              <p>
                • <strong>Cấu trúc bài thi:</strong> Đề thi gồm 10 câu hỏi độc lập được trích xuất từ ngân hàng 120 câu hỏi mô phỏng. Thời gian làm bài là 15 phút.
              </p>
              <p>
                • <strong>Thang điểm mỗi câu:</strong> Tối đa 1,0 điểm. Nếu học viên làm đúng 1 phần được 0,25đ; đúng 2 phần được 0,50đ; đúng 3 phần được 0,75đ; đúng cả 4 phần được 1,00đ.
              </p>
              <p>
                • <strong>Điều kiện đạt:</strong> Tổng điểm toàn bài từ <strong>8,0 / 10 điểm</strong> trở lên (tương đương tối thiểu đạt 32/40 phần trắc nghiệm).
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
