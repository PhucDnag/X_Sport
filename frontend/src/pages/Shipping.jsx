// src/pages/Shipping.jsx
import React from 'react';
import { Link } from 'react-router-dom';  // Để dùng cho nút quay về

const Shipping = () => {
  return (
    <div className="min-h-screen bg-white py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            PHƯƠNG THỨC VẬN CHUYỂN
          </h1>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Chúng tôi cam kết mang đến dịch vụ giao hàng nhanh chóng, an toàn và đáng tin cậy cho mọi đơn hàng vợt cầu lông của bạn.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-4 sm:space-y-6">
          {/* Section 1 */}
          <section className="bg-gray-50 rounded-lg p-4 sm:p-6 lg:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
              1. Phạm vi giao hàng
            </h2>
            <div className="space-y-6 text-gray-700 leading-relaxed text-sm sm:text-base">
              {/* Subsection 1.1 */}
              <div className="pl-4 border-l-4 border-blue-500">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">1.1. Khu vực TP. Hà Nội</h3>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Đơn hàng vợt cầu lông sẽ được giao tận nơi theo địa chỉ khách hàng cung cấp.</li>
                  <li>Vợt được đóng gói cẩn thận, đảm bảo an toàn trong quá trình vận chuyển.</li>
                  <li>Nếu có yêu cầu đặc biệt về giao hàng (ví dụ: sử dụng thang máy, giao ngoài giờ hành chính…), khách hàng vui lòng thanh toán thêm chi phí phát sinh.</li>
                </ul>
              </div>

              {/* Subsection 1.2 */}
              <div className="pl-4 border-l-4 border-blue-500">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">1.2. Các tỉnh thành khác trên toàn quốc</h3>
                <p>X-sport hỗ trợ giao hàng toàn quốc cho tất cả các đơn hàng vợt cầu lông. Có 2 hình thức giao hàng:</p>
                <ul className="space-y-2 list-disc list-inside mt-2">
                  <li><strong>Hình thức 1:</strong> Giao hàng tận nơi bằng dịch vụ chuyển phát nhanh (Viettel Post, Giao Hàng Nhanh, J&T, v.v.).</li>
                  <li><strong>Hình thức 2:</strong> Giao hàng đến kho bãi của đơn vị vận chuyển theo chỉ định của khách hàng tại TP. Hà Nội.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="bg-gray-50 rounded-lg p-4 sm:p-6 lg:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
              2. Thời gian giao hàng
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed text-sm sm:text-base">
              <p>Thời gian xử lý và giao hàng: 8h – 12h và 13h – 17h, từ thứ 2 đến chủ nhật (trừ ngày lễ, Tết).</p>
              <p><strong>Nội thành TP.HCM:</strong> Với vợt có sẵn, giao nhanh trong vòng 1 – 2 giờ.</p>
              <p><strong>Các tỉnh thành khác:</strong></p>
              <ul className="space-y-2 list-disc list-inside mt-2">
                <li>Vợt có sẵn: giao trong vòng 3 – 5 ngày làm việc.</li>
                <li>Vợt đặt hàng: giao trong vòng 7 – 14 ngày làm việc.</li>
              </ul>
              <p>Khách hàng vui lòng sắp xếp thời gian hoặc cử người nhận hàng theo lịch đã thống nhất.</p>
              <p>Trường hợp muốn thay đổi thời gian giao, hủy đơn hoặc đổi đơn, vui lòng liên hệ hotline của X-sport:</p>
              <ul className="space-y-2 list-disc list-inside mt-2">
                <li>Ít nhất 24h trước đối với đơn hàng nội thành TP. Hà Nội.</li>
                <li>Ít nhất 48h trước đối với đơn hàng ngoại tỉnh.</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section className="bg-gray-50 rounded-lg p-4 sm:p-6 lg:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
              3. Phí giao hàng
            </h2>
            <div className="space-y-6 text-gray-700 leading-relaxed text-sm sm:text-base">
              {/* Subsection 3.1 */}
              <div className="pl-4 border-l-4 border-blue-500">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">3.1. Khu vực TP. Hà Nội</h3>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Phí giao hàng tính theo mức giá hiện hành của các dịch vụ giao nhanh (Grab, Ahamove, Lalamove…).</li>
                  <li>Giao ngoài giờ hành chính: cộng thêm 30% phí giao hàng, tối thiểu 50.000 VNĐ.</li>
                  <li>X-sport sẽ lựa chọn phương thức vận chuyển phù hợp để đảm bảo an toàn cho vợt.</li>
                </ul>
              </div>

              {/* Subsection 3.2 */}
              <div className="pl-4 border-l-4 border-blue-500">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">3.2. Các tỉnh thành khác</h3>
                <p>Phí giao hàng đến đơn vị vận chuyển trung gian theo biểu phí của TP. Hà Nội.</p>
                <p>Phí giao từ đơn vị trung gian đến địa chỉ khách hàng sẽ được thông báo sau khi X-sport nhận đơn.</p>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="bg-gray-50 rounded-lg p-4 sm:p-6 lg:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
              4. Phí vận chuyển đối với sản phẩm đổi trả/bảo hành
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed text-sm sm:text-base">
              <p>X-sport hỗ trợ bảo hành miễn phí cho vợt chính hãng trong thời gian bảo hành theo quy định của hãng.</p>
              <p>Với các đơn hàng đổi trả không phải do lỗi từ X-sport, khách hàng thanh toán phí vận chuyển theo biểu phí quy định.</p>
            </div>
          </section>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-8 sm:mt-12">
          <a href="/"
            className="inline-block bg-blue-600 text-white px-6 sm:px-8 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 font-medium text-sm sm:text-base"
          >
            Quay về trang chủ
          </a>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
