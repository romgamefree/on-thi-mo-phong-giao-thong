import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, Phone, Clock, MapPin, AlertCircle } from 'lucide-react';

interface ContactModeProps {
  onGoHome: () => void;
}

export const ContactMode: React.FC<ContactModeProps> = ({ onGoHome }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'feedback_question',
    questionNumber: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Vui lòng điền đầy đủ họ tên, email và nội dung phản hồi.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-56px)] bg-[#f8fafc]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200 px-4 py-3 shadow-xs">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <button onClick={onGoHome} className="hover:text-blue-700 cursor-pointer">Trang chủ</button>
            <span>/</span>
            <span className="text-slate-900 font-semibold">Liên hệ & Hỗ trợ học viên</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-5xl w-full mx-auto p-4 md:p-8 space-y-8">
        {/* Banner */}
        <div className="bg-gradient-to-r from-[#1b3a8c] to-[#0f245c] text-white rounded-2xl p-6 md:p-8 space-y-2">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Liên Hệ & Đóng Góp Ý Kiến Hoàn Thiện Hệ Thống
          </h1>
          <p className="text-xs md:text-sm text-blue-100/90 leading-relaxed max-w-2xl">
            Chúng tôi luôn lắng nghe phản hồi của các học viên và thầy cô giáo dạy lái xe để liên tục cập nhật dữ liệu sát hạch chuẩn xác nhất theo quy định Cục Đường Bộ Việt Nam.
          </p>
        </div>

        {/* 2 Columns: Contact Form & Info */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Left Column: Form */}
          <div className="md:col-span-7 bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Gửi Góp Ý Thành Công!
                </h3>
                <p className="text-xs md:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Cảm ơn bạn đã đóng góp ý kiến cho ban biên tập. Chúng tôi sẽ tiếp nhận, đối soát dữ liệu và phản hồi lại bạn trong thời gian sớm nhất qua email <strong>{formData.email}</strong>.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', topic: 'feedback_question', questionNumber: '', message: '' });
                  }}
                  className="mt-3 px-4 py-2 bg-blue-700 text-white rounded text-xs font-semibold hover:bg-blue-800 transition-colors cursor-pointer"
                >
                  Gửi ý kiến khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs md:text-sm">
                <h2 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-2">
                  Biểu Mẫu Góp Ý & Báo Lỗi Tình Huống
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Họ và tên học viên *</label>
                    <input
                      type="text"
                      required
                      placeholder="Nguyễn Văn A"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Địa chỉ Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Chủ đề góp ý</label>
                    <select
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none bg-white"
                    >
                      <option value="feedback_question">Góp ý đáp án 4 phần tình huống</option>
                      <option value="report_bug">Báo lỗi video / tốc độ tải trang</option>
                      <option value="feature_request">Đề xuất tính năng mới</option>
                      <option value="general">Thắc mắc chung</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Số câu tình huống (nếu có)</label>
                    <input
                      type="number"
                      min={1}
                      max={120}
                      placeholder="Ví dụ: 57"
                      value={formData.questionNumber}
                      onChange={(e) => setFormData({ ...formData, questionNumber: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Nội dung chi tiết *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Mô tả chi tiết câu hỏi hoặc góp ý của bạn..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#1b3a8c] hover:bg-[#152e6e] text-white font-bold rounded shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send size={15} />
                  <span>Gửi góp ý cho ban biên tập</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Support Details */}
          <div className="md:col-span-5 space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3.5 text-xs md:text-sm text-slate-700">
              <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-2">
                Kênh Hỗ Trợ Trực Tuyến
              </h3>

              <div className="flex items-start gap-2.5">
                <Mail size={16} className="text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900">Email ban biên tập</div>
                  <div className="text-slate-600">hotro.mophong@gmail.com</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock size={16} className="text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900">Thời gian hỗ trợ</div>
                  <div className="text-slate-600">8:00 – 22:00 (Thứ 2 đến Chủ nhật)</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MessageSquare size={16} className="text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900">Thời gian phản hồi</div>
                  <div className="text-slate-600">Trong vòng 12 - 24 giờ làm việc</div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs text-blue-900 leading-relaxed space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-blue-700" />
                <span>Cập nhật liên tục 2026</span>
              </div>
              <p className="text-blue-800 text-[11px]">
                Mọi thay đổi về ngân hàng câu hỏi và phương án xử lý theo quyết định của Cục Đường Bộ Việt Nam đều được cập nhật tự động lên hệ thống trong vòng 24 giờ.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
