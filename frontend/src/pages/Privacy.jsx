// src/pages/Privacy.jsx
import React from 'react';
import { Link } from 'react-router-dom';  // Để dùng cho nút quay về

const Privacy = () => {
  return (
    <div className="min-h-screen bg-white py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            CHÍNH SÁCH BẢO MẬT THÔNG TIN
          </h1>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Chính sách bảo mật thông tin này nhằm giúp Quý khách hiểu rõ về cách X-sport thu thập và sử dụng thông tin cá nhân của mình khi truy cập và mua hàng trên website, bao gồm mọi thông tin có thể cung cấp thông qua việc đăng ký tài khoản, đặt mua sản phẩm, hoặc gửi góp ý về dịch vụ của chúng tôi.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-4 sm:space-y-6">
          {/* Section 1 */}
          <section className="bg-gray-50 rounded-lg p-4 sm:p-6 lg:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
              1. X-sport thu thập thông tin khách hàng từ đâu?
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed text-sm sm:text-base">
              <p>- Thông tin được khách hàng cung cấp khi đặt hàng, đăng ký tài khoản hoặc điền vào các form liên hệ/góp ý trên website.</p>
              <p>- Thông tin để lại qua các kênh hỗ trợ khác nhau như chat trực tuyến, email, hotline, khảo sát.</p>
              <p>- Thông tin có thể bao gồm: Họ tên, số điện thoại, email, địa chỉ giao hàng, tên đơn vị/công ty (nếu có), và phương thức thanh toán.</p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="bg-gray-50 rounded-lg p-4 sm:p-6 lg:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
              2. Mục đích sử dụng thông tin khách hàng
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed text-sm sm:text-base">
              <p>- Xác nhận và xử lý đơn hàng, giao hàng đúng địa chỉ mà khách hàng cung cấp.</p>
              <p>- Gửi thông tin khuyến mãi, chương trình ưu đãi, sự kiện thể thao liên quan đến cầu lông.</p>
              <p>- Giải đáp thắc mắc, cung cấp hỗ trợ khách hàng trong quá trình mua sắm và sử dụng sản phẩm.</p>
              <p>- Khảo sát ý kiến khách hàng nhằm nâng cao chất lượng sản phẩm và dịch vụ.</p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="bg-gray-50 rounded-lg p-4 sm:p-6 lg:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
              3. Bảo mật thông tin khách hàng
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed text-sm sm:text-base">
              <p>- X-sport cam kết bảo mật tuyệt đối mọi thông tin khách hàng:</p>
              <p>- Không bán, cho thuê hay chia sẻ thông tin khách hàng cho bên thứ ba vì mục đích thương mại.</p>
              <p>- Thông tin cá nhân chỉ có thể được tiết lộ trong trường hợp đặc biệt khi pháp luật yêu cầu hoặc khi khách hàng có dấu hiệu vi phạm điều khoản dịch vụ.</p>
              <p>- Hệ thống của chúng tôi sử dụng các biện pháp kỹ thuật và quy trình quản lý phù hợp để ngăn chặn việc mất mát, rò rỉ hay thay đổi dữ liệu.</p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="bg-gray-50 rounded-lg p-4 sm:p-6 lg:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
              4. Lưu trữ dữ liệu khách hàng
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed text-sm sm:text-base">
              <p>- Tất cả thông tin khách hàng sẽ được lưu trữ trong cơ sở dữ liệu của X-sport.</p>
              <p>- Dữ liệu sẽ được lưu giữ cho đến khi khách hàng chấm dứt sử dụng dịch vụ hoặc yêu cầu xóa thông tin.</p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="bg-gray-50 rounded-lg p-4 sm:p-6 lg:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
              5. Thay đổi chính sách bảo mật
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed text-sm sm:text-base">
              <p>- X-sport có quyền thay đổi chính sách bảo mật vào từng thời điểm để phù hợp hơn với hoạt động kinh doanh.</p>
              <p>- Mọi thay đổi sẽ được thông báo công khai trên website và gửi email đến khách hàng (nếu có).</p>
            </div>
          </section>

          {/* Contact Section */}
          <section className="bg-blue-50 rounded-lg p-4 sm:p-6 lg:p-8 border-l-4 border-blue-500">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-900 mb-4">
              📌 Liên hệ với X-sport
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed text-sm sm:text-base">
              <p>Nếu có bất kỳ thắc mắc hay góp ý liên quan đến chính sách bảo mật, Quý khách vui lòng liên hệ:</p>
              <p className="flex items-center gap-2">
                <span className="text-lg">📞</span>
                <span>Hotline: Số điện thoại demo</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-lg">📧</span>
                <span>Email: Email demo</span>
              </p>
            </div>
          </section>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-8 sm:mt-12">
          <a
            href="/"
            className="inline-block bg-blue-600 text-white px-6 sm:px-8 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 font-medium text-sm sm:text-base"
          >
            Quay về trang chủ
          </a>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
