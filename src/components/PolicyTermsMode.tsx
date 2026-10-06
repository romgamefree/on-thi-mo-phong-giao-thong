import React, { useState } from 'react';
import { ShieldCheck, FileText, Lock, Eye, AlertCircle } from 'lucide-react';

interface PolicyTermsModeProps {
  onGoHome: () => void;
}

export const PolicyTermsMode: React.FC<PolicyTermsModeProps> = ({ onGoHome }) => {
  const [tab, setTab] = useState<'privacy' | 'terms'>('privacy');

  return (
    <div className="flex flex-col min-h-[calc(100vh-56px)] bg-[#f8fafc]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200 px-4 py-3 shadow-xs">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <button onClick={onGoHome} className="hover:text-blue-700 cursor-pointer">Trang chủ</button>
            <span>/</span>
            <span className="text-slate-900 font-semibold">Chính sách & Điều khoản</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-8 space-y-6">
        {/* Tab Toggle */}
        <div className="flex border-b border-slate-200 gap-4 text-xs md:text-sm font-semibold">
          <button
            onClick={() => setTab('privacy')}
            className={`pb-3 px-2 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              tab === 'privacy'
                ? 'border-blue-700 text-blue-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Lock size={15} />
            <span>Chính sách bảo mật quyền riêng tư</span>
          </button>
          <button
            onClick={() => setTab('terms')}
            className={`pb-3 px-2 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              tab === 'terms'
                ? 'border-blue-700 text-blue-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileText size={15} />
            <span>Điều khoản sử dụng dịch vụ</span>
          </button>
        </div>

        {tab === 'privacy' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8 shadow-xs space-y-5 text-xs md:text-sm text-slate-700 leading-relaxed">
            <h1 className="text-lg md:text-xl font-bold text-slate-900">
              Chính Sách Bảo Mật Quyền Riêng Tư (Privacy Policy)
            </h1>
            <p className="text-slate-500 text-xs">
              Cập nhật lần cuối: Tháng 10/2026. Áp dụng cho toàn bộ người dùng Hệ thống Ôn tập & Thi thử Mô phỏng Giao thông.
            </p>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <h3 className="font-bold text-slate-900 text-sm">1. Thu thập dữ liệu người dùng</h3>
                <p>
                  Hệ thống hoạt động dưới hình thức ứng dụng web tĩnh máy khách (Client-side Web App). Chúng tôi <strong>không bắt buộc đăng ký tài khoản</strong> và <strong>không thu thập các thông tin định danh cá nhân nhạy cảm</strong> (như số CMND/CCCD, số điện thoại, vị trí GPS thực tế).
                </p>
              </div>

              <div className="space-y-1.5">
                <h3 className="font-bold text-slate-900 text-sm">2. Lưu trữ kết quả học tập tại máy khách (Local Storage)</h3>
                <p>
                  Lịch sử điểm thi thử, các bài đã hoàn thành và tiến độ ôn tập được lưu trữ trực tiếp trên bộ nhớ trình duyệt (Web LocalStorage) của thiết bị cá nhân bạn. Dữ liệu này hoàn toàn thuộc quyền kiểm soát của bạn và không được gửi lên bất kỳ máy chủ bên thứ ba nào.
                </p>
              </div>

              <div className="space-y-1.5">
                <h3 className="font-bold text-slate-900 text-sm">3. Cookies và mã theo dõi</h3>
                <p>
                  Hệ thống không sử dụng cookies theo dõi quảng cáo, không tích hợp mạng lưới quảng cáo phiền toái nhằm đem lại trải nghiệm học tập tập trung và bảo mật cao nhất cho học viên.
                </p>
              </div>

              <div className="space-y-1.5">
                <h3 className="font-bold text-slate-900 text-sm">4. Liên hệ bảo mật</h3>
                <p>
                  Mọi thắc mắc liên quan đến chính sách bảo mật hoặc yêu cầu xóa dữ liệu trên trình duyệt, học viên có thể chủ động xóa dữ liệu duyệt web hoặc liên hệ ban biên tập qua mục Liên hệ.
                </p>
              </div>
            </div>
          </div>
        )}

        {tab === 'terms' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8 shadow-xs space-y-5 text-xs md:text-sm text-slate-700 leading-relaxed">
            <h1 className="text-lg md:text-xl font-bold text-slate-900">
              Điều Khoản Sử Dụng Dịch Vụ (Terms of Service)
            </h1>
            <p className="text-slate-500 text-xs">
              Quy định quyền và nghĩa vụ của người sử dụng nền tảng ôn thi sát hạch mô phỏng giao thông.
            </p>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <h3 className="font-bold text-slate-900 text-sm">1. Mục đích sử dụng</h3>
                <p>
                  Hệ thống được cung cấp hoàn toàn miễn phí nhằm phục vụ mục đích học tập, rèn luyện phản xạ lái xe an toàn và hỗ trợ học viên chuẩn bị cho kỳ sát hạch giấy phép lái xe ô tô các hạng B1, B2, C, D, E.
                </p>
              </div>

              <div className="space-y-1.5">
                <h3 className="font-bold text-slate-900 text-sm">2. Bản quyền và nguồn tài liệu</h3>
                <p>
                  Nội dung các tình huống và video mô phỏng tuân theo chuẩn nghiệp vụ của Cục Đường Bộ Việt Nam. Người dùng không được sao chép, thương mại hóa hoặc sử dụng dữ liệu hệ thống cho các mục đích vi phạm pháp luật.
                </p>
              </div>

              <div className="space-y-1.5">
                <h3 className="font-bold text-slate-900 text-sm">3. Tuyên bố miễn trừ trách nhiệm</h3>
                <p>
                  Kết quả thi thử trên hệ thống mang tính chất tham khảo rèn luyện kỹ năng và không thay thế cho kết quả sát hạch chính thức do các Hội đồng sát hạch của Sở Giao thông Vận tải cấp. Người lái xe khi tham gia giao thông thực tế cần luôn tuân thủ Luật Giao thông đường bộ và phán đoán theo tình hình thực tế.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
