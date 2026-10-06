import React from 'react';
import { ShieldCheck, Award, FileText, CheckCircle2, Scale, Users, HeartHandshake } from 'lucide-react';

interface AboutModeProps {
  onGoHome: () => void;
  onGoToStudy: () => void;
  onGoToExams: () => void;
}

export const AboutMode: React.FC<AboutModeProps> = ({ onGoHome, onGoToStudy, onGoToExams }) => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-56px)] bg-[#f8fafc]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200 px-4 py-3 shadow-xs">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <button onClick={onGoHome} className="hover:text-blue-700 cursor-pointer">Trang chủ</button>
            <span>/</span>
            <span className="text-slate-900 font-semibold">Giới thiệu & Cơ sở pháp lý</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onGoToExams}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded text-xs font-semibold cursor-pointer transition-colors"
            >
              Thi thử 18 đề
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-5xl w-full mx-auto p-4 md:p-8 space-y-8">
        {/* Banner */}
        <div className="bg-gradient-to-r from-[#1b3a8c] to-[#122a6b] text-white rounded-2xl p-6 md:p-8 space-y-3">
          <span className="inline-block bg-white/15 text-blue-100 text-xs px-3 py-1 rounded-full font-medium tracking-wide">
            CƠ SỞ PHÁP LÝ & TIÊU CHUẨN ĐÀO TẠO
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Giới Thiệu Hệ Thống Ôn Tập & Thi Thử Mô Phỏng Giao Thông
          </h1>
          <p className="text-xs md:text-sm text-blue-100/90 leading-relaxed max-w-3xl">
            Nền tảng giáo dục điện tử chuẩn hóa, cung cấp bộ công cụ trực tuyến phục vụ người học lái xe ô tô ôn luyện 120 tình huống mô phỏng các nguy cơ mất an toàn giao thông đường bộ theo quy định bắt buộc của Cục Đường Bộ Việt Nam.
          </p>
        </div>

        {/* 1. Legal Basis */}
        <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-[#1b3a8c]">
            <Scale size={22} />
            <h2 className="text-lg font-bold text-slate-900">
              1. Căn Cứ Pháp Lý & Quy Định Ban Hành
            </h2>
          </div>
          <div className="space-y-3 text-xs md:text-sm text-slate-700 leading-relaxed">
            <p>
              Hệ thống được xây dựng và cập nhật dữ liệu dựa trên các văn bản quy phạm pháp luật hiện hành của Bộ Giao thông Vận tải và Cục Đường Bộ Việt Nam:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <FileText size={16} className="text-blue-700 shrink-0" />
                  <span>Thông tư 04/2022/TT-BGTVT</span>
                </div>
                <p className="text-slate-600 text-xs">
                  Quy định sửa đổi, bổ sung một số điều của Thông tư 12/2017/TT-BGTVT về đào tạo, sát hạch, cấp giấy phép lái xe cơ giới đường bộ, chính thức áp dụng nội dung thi mô phỏng tình huống giao thông vào kỳ thi sát hạch.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <FileText size={16} className="text-blue-700 shrink-0" />
                  <span>Quyết định số 446/QĐ-CĐBVN</span>
                </div>
                <p className="text-slate-600 text-xs">
                  Về việc ban hành và hướng dẫn áp dụng phần mềm mô phỏng các tình huống giao thông dùng cho đào tạo lái xe ô tô các hạng B1, B2, C, D, E và các hạng F trên toàn quốc.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Objectives & Principles */}
        <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-[#1b3a8c]">
            <Award size={22} />
            <h2 className="text-lg font-bold text-slate-900">
              2. Mục Tiêu & Giá Trị Đào Tạo
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs md:text-sm text-slate-700">
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200/80 space-y-2">
              <div className="font-bold text-slate-900">Nâng cao phản xạ an toàn</div>
              <p className="text-slate-600 leading-relaxed text-xs">
                Giúp người lái xe hình thành phản xạ tự nhiên nhận diện sớm các nguy cơ tiềm ẩn (điểm mù xe tải, người đi bộ bất ngờ, xe rẽ ẩu) trước khi rủi ro va chạm xảy ra.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200/80 space-y-2">
              <div className="font-bold text-slate-900">Chấm điểm 4 phần minh bạch</div>
              <p className="text-slate-600 leading-relaxed text-xs">
                Đánh giá toàn diện năng lực của học viên qua 4 khía cạnh: nhận diện tên tình huống, dấu hiệu gián tiếp, dấu hiệu trực tiếp và phương án xử lý (mỗi phần 0,25đ).
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200/80 space-y-2">
              <div className="font-bold text-slate-900">Tối ưu tốc độ & Trải nghiệm</div>
              <p className="text-slate-600 leading-relaxed text-xs">
                Ứng dụng web tĩnh siêu nhẹ, tải trang tức thì, hỗ trợ mượt mà trên cả máy tính, máy tính bảng và điện thoại mà không cần cài đặt phần mềm cồng kềnh.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Advisory Board & Quality Commitment */}
        <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-[#1b3a8c]">
            <Users size={22} />
            <h2 className="text-lg font-bold text-slate-900">
              3. Đội Ngũ Cố Vấn & Cam Kết Chất Lượng
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
            Hệ thống được bảo trợ nội dung và rà soát bởi các giáo viên giàu kinh nghiệm tại các trung tâm đào tạo và sát hạch lái xe hàng đầu. Toàn bộ các mốc thời gian, dấu hiệu nguy hiểm và gợi ý xử lý được chuẩn hóa theo đúng ngân hàng câu hỏi chính thức.
          </p>
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-start gap-3">
            <CheckCircle2 size={20} className="text-emerald-700 shrink-0 mt-0.5" />
            <div className="text-xs md:text-sm text-emerald-900 leading-relaxed">
              <strong>Cam kết miễn phí vì cộng đồng:</strong> Hệ thống hoạt động phi lợi nhuận, không thu phí người dùng, không chèn quảng cáo gây phiền toái, phục vụ tốt nhất cho cộng đồng học viên học lái xe an toàn trên khắp cả nước.
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
