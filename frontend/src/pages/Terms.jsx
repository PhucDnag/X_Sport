// src/pages/Terms.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Terms = () => {
  return (
    <div className="min-h-screen bg-white py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            ĐIỀU KHOẢN SỬ DỤNG DỊCH VỤ
          </h1>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Cập nhật để khách hàng của X-sport hiểu rõ hơn về những quy định cần tuân thủ khi mua sắm và sử dụng dịch vụ, qua đó hỗ trợ việc hợp tác nhanh chóng, hiệu quả và minh bạch.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-4 sm:space-y-6">
          {/* Section I */}
          <section className="bg-gray-50 rounded-lg p-4 sm:p-6 lg:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
              I. Điều khoản chung
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed text-sm sm:text-base">
              <p>- Khách hàng phải đủ 18 tuổi trở lên hoặc có sự đồng ý của người giám hộ khi mua hàng tại X-sport.</p>
              <p>- Khách hàng cần cung cấp thông tin đầy đủ và chính xác (họ tên, địa chỉ giao hàng, số điện thoại, email…) khi đặt hàng.</p>
              <p>- Khi sử dụng dịch vụ của X-sport, khách hàng mặc nhiên được xem là đã đồng ý và bị ràng buộc bởi các điều khoản này.</p>
              <p>- Đối tượng áp dụng: tất cả khách hàng, cá nhân hoặc tổ chức sử dụng dịch vụ/mua hàng tại X-sport.</p>
              <p>- X-sport có quyền cập nhật, điều chỉnh điều khoản sử dụng vào từng thời điểm. Khách hàng có trách nhiệm theo dõi và chấp nhận những điều khoản được sửa đổi.</p>
            </div>
          </section>

          {/* Section II */}
          <section className="bg-gray-50 rounded-lg p-4 sm:p-6 lg:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
              II. Điều khoản sử dụng website
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed text-sm sm:text-base">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mt-4">Mục đích sử dụng</h3>
              <p>- Khách hàng cam kết sử dụng website X-sport cho mục đích hợp pháp: tìm hiểu sản phẩm, mua hàng, tham khảo thông tin khuyến mãi.</p>
              <p>- Nghiêm cấm sử dụng website cho các hành vi vi phạm pháp luật như gian lận thương mại, phát tán nội dung độc hại, xâm phạm quyền lợi của X-sport hoặc bên thứ ba.</p>

              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mt-4">Thông tin hiển thị</h3>
              <p>- Khách hàng chịu trách nhiệm về tính xác thực của thông tin cung cấp khi đặt hàng (ví dụ: địa chỉ giao hàng, số điện thoại liên hệ).</p>

              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mt-4">Quyền sở hữu trí tuệ</h3>
              <p>- Tất cả hình ảnh, nội dung, thương hiệu, logo của X-sport đều thuộc quyền sở hữu của X-sport. Khách hàng không được phép sao chép, sử dụng cho mục đích thương mại khi chưa có sự đồng ý bằng văn bản.</p>

              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mt-4">Bảo mật tài khoản</h3>
              <p>- Khách hàng có trách nhiệm bảo mật thông tin tài khoản của mình trên X-sport. Nếu phát hiện có hành vi sử dụng trái phép, cần thông báo ngay cho X-sport.</p>
              <p>- X-sport không chịu trách nhiệm trong trường hợp khách hàng để lộ mật khẩu hoặc thông tin đăng nhập cá nhân.</p>

              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mt-4">Gián đoạn dịch vụ</h3>
              <p>- X-sport cam kết duy trì hoạt động ổn định của website. Tuy nhiên, chúng tôi sẽ không chịu trách nhiệm trong các trường hợp bất khả kháng như: thiên tai, sự cố kỹ thuật ngoài tầm kiểm soát, hệ thống bị tấn công.</p>

              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mt-4">Khiếu nại và hỗ trợ</h3>
              <p>- Mọi khiếu nại liên quan đến chất lượng sản phẩm hoặc dịch vụ, khách hàng có thể liên hệ trực tiếp qua hotline/email. X-sport sẽ tiếp nhận và xử lý trong phạm vi trách nhiệm.</p>

              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mt-4">Quyền từ chối dịch vụ</h3>
              <p>- X-sport có quyền từ chối hoặc hủy đơn hàng trong các trường hợp khách hàng vi phạm điều khoản hoặc có dấu hiệu gian lận mà không cần thông báo trước.</p>
            </div>
          </section>

          {/* Section III */}
          <section className="bg-gray-50 rounded-lg p-4 sm:p-6 lg:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
              III. Điều khoản thanh toán
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed text-sm sm:text-base">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mt-4">Phương thức thanh toán</h3>
              <p>- Khách hàng có thể lựa chọn thanh toán trực tiếp (COD) hoặc chuyển khoản ngân hàng theo hướng dẫn trên website.</p>
              <p>- Tất cả chi phí liên quan đến thanh toán sẽ được ghi rõ trong đơn hàng.</p>

              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mt-4">Phí và hoàn tiền</h3>
              <p>- Khách hàng có trách nhiệm thanh toán đầy đủ giá trị đơn hàng sau khi đặt mua.</p>
              <p>- Trường hợp khách hàng hủy đơn trước khi giao, X-sport sẽ xử lý theo chính sách đổi trả/hoàn tiền đã công bố.</p>

              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mt-4">Gia hạn dịch vụ (nếu có)</h3>
              <p>- Đối với các dịch vụ đi kèm như bảo hành, khách hàng cần lưu lại chứng từ mua hàng để được hỗ trợ nhanh chóng.</p>
            </div>
          </section>

          {/* Section IV */}
          <section className="bg-gray-50 rounded-lg p-4 sm:p-6 lg:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
              IV. Một số điều khoản khác
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed text-sm sm:text-base">
              <p>- Nếu khách hàng không cung cấp thông tin chính xác, việc giao hàng có thể bị chậm trễ hoặc hủy bỏ. X-sport không chịu trách nhiệm trong trường hợp này.</p>
              <p>- Trường hợp khách hàng có nhu cầu đặc biệt (ví dụ: đặt vợt custom, số lượng lớn), X-sport sẽ lập hợp đồng riêng theo thỏa thuận.</p>
              <p>- Trong tình huống bất khả kháng (thiên tai, dịch bệnh, chiến tranh…), hai bên sẽ cùng bàn bạc để đưa ra phương án xử lý phù hợp.</p>
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

export default Terms;
