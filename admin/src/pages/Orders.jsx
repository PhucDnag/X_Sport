import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // --- STATE CHO MODAL CHI TIẾT ---
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const ordersPerPage = 5;

  const fetchAllOrders = async () => {
    if (!token) return null;
    try {
      setLoading(true);
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
        toast.success("Cập nhật trạng thái thành công!");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Có lỗi xảy ra");
    }
  };

  // --- HÀM MỞ MODAL CHI TIẾT ---
  const openDetailModal = (order) => {
    setSelectedOrder(order);
    setShowDetailModal(true);
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  // Pagination Logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <img
                  src={assets.parcel_icon}
                  className="w-8 h-8 mr-3 opacity-80"
                  alt=""
                />
                Quản lý đơn hàng
              </h1>
              <p className="text-gray-600 mt-1">
                Theo dõi và xử lý tất cả đơn hàng
              </p>
            </div>
            <div className="text-right hidden sm:block">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 min-w-[120px]">
                <p className="text-blue-800 font-bold text-2xl">
                  {orders.length}
                </p>
                <p className="text-blue-600 text-sm font-medium">
                  Tổng đơn hàng
                </p>
              </div>
            </div>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center flex flex-col items-center">
            <div className="bg-gray-100 p-4 rounded-full mb-4">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">
              Chưa có đơn hàng nào
            </h3>
          </div>
        ) : (
          <>
            {/* Stats Bar */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6 flex justify-between items-center">
              <span className="text-gray-600 text-sm">
                Hiển thị{" "}
                <span className="font-bold text-gray-900">
                  {indexOfFirstOrder + 1}-
                  {Math.min(indexOfLastOrder, orders.length)}
                </span>{" "}
                trên{" "}
                <span className="font-bold text-gray-900">{orders.length}</span>{" "}
                kết quả
              </span>
              <span className="text-gray-500 text-sm">
                Trang {currentPage}/{totalPages}
              </span>
            </div>

            {/* Orders List */}
            <div className="space-y-6">
              {currentOrders.map((order, index) => (
                <div
                  className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
                  key={index}
                >
                  {/* Order Header */}
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-100 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="bg-white p-2 rounded-lg border border-gray-200 shadow-sm flex-shrink-0">
                        <img
                          className="w-6 h-6"
                          src={assets.parcel_icon}
                          alt=""
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-gray-800 text-base truncate">
                          #{order._id.slice(-6).toUpperCase()}
                        </h4>
                        <div className="flex gap-2 text-xs mt-1">
                          <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded whitespace-nowrap">
                            {new Date(order.createdAt).toLocaleDateString(
                              "vi-VN"
                            )}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="sm:flex items-center justify-between text-center sm:justify-end gap-3 w-full sm:w-auto">
                      <p className="text-base font-bold text-red-600 flex-shrink-0">
                        {order.amount.toLocaleString("vi-VN")}
                        {currency}
                      </p>
                      <select
                        onChange={(event) => statusHandler(event, order._id)}
                        value={order.status}
                        className={`px-3 py-1.5 my-2 sm:px-3 sm:py-1.5 rounded-lg font-medium text-sm cursor-pointer border-0 outline-none ring-1 ring-inset focus:ring-2 transition-all min-w-0 flex-shrink-0 ${
                          order.status === "Đã giao hàng"
                            ? "bg-green-50 text-green-700 ring-green-600/20 focus:ring-green-600"
                            : order.status === "Đang giao hàng"
                            ? "bg-blue-50 text-blue-700 ring-blue-600/20 focus:ring-blue-600"
                            : order.status === "Đang đóng gói"
                            ? "bg-yellow-50 text-yellow-700 ring-yellow-600/20 focus:ring-yellow-600"
                            : "bg-gray-50 text-gray-700 ring-gray-500/20 focus:ring-gray-500"
                        }`}
                      >
                        <option value="Đã đặt hàng">Đã đặt hàng</option>
                        <option value="Đang đóng gói">Đang đóng gói</option>
                        <option value="Đang giao hàng">Đang giao hàng</option>
                        <option value="Đã giao hàng">Đã giao hàng</option>
                      </select>
                    </div>
                  </div>

                  {/* Order Body Grid */}
                  <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8 text-sm">
                    {/* Cột 1: Sản phẩm */}
                    <div className="lg:col-span-1">
                      <div className="flex justify-between items-center mb-4">
                        <h5 className="font-bold text-gray-800 flex items-center gap-2">
                          <svg
                            className="w-4 h-4 text-blue-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                            />
                          </svg>
                          Danh sách sản phẩm
                        </h5>
                        <button
                          onClick={() => openDetailModal(order)}
                          className="text-blue-600 hover:text-blue-800 text-xs font-semibold underline flex items-center gap-1"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                          Xem chi tiết đóng hàng
                        </button>
                      </div>
                      <div className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                        {order.items.map((item, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-start border-b border-dashed border-gray-100 pb-2 last:border-0"
                          >
                            <span className="text-gray-700 font-medium line-clamp-1 pr-2">
                              {item.name}
                            </span>
                            <span className="text-gray-500 whitespace-nowrap">
                              x{item.quantity}{" "}
                              <span className="bg-gray-100 px-1 rounded text-xs">
                                {item.size}
                              </span>
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Cột 2: Khách hàng */}
                    <div className="lg:col-span-1 border-l-0 lg:border-l border-gray-100 lg:pl-8">
                      <h5 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-blue-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        Địa chỉ nhận hàng
                      </h5>
                      <div className="space-y-2 text-gray-600">
                        <p className="font-bold text-gray-800">
                          {order.address.firstName +
                            " " +
                            order.address.lastName}
                        </p>
                        <p className="leading-relaxed">
                          {order.address.street}, {order.address.city},{" "}
                          {order.address.state}
                        </p>
                        <p className="flex items-center gap-2 mt-2">
                          <svg
                            className="w-3 h-3 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                          <span className="font-medium text-gray-800">
                            {order.address.phone}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Cột 3: Thanh toán */}
                    <div className="lg:col-span-1 border-l-0 lg:border-l border-gray-100 lg:pl-8">
                      <h5 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-blue-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                          />
                        </svg>
                        Thanh toán
                      </h5>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center bg-gray-50 p-2 rounded">
                          <span className="text-gray-500">Hình thức</span>
                          <span className="font-semibold text-gray-700">
                            {order.paymentMethod}
                          </span>
                        </div>
                        <div className="flex justify-between items-center bg-gray-50 p-2 rounded">
                          <span className="text-gray-500">Trạng thái</span>
                          <span
                            className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${
                              order.payment
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {order.payment
                              ? "Đã thanh toán"
                              : "Chưa thanh toán"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <nav className="flex items-center gap-1 bg-white p-1 rounded-lg border border-gray-200 shadow-sm">
                  {/* Nút Trước */}
                  <button
                    onClick={goToPrevPage}
                    disabled={currentPage === 1}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                      currentPage === 1
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    Trước
                  </button>

                  {/* Vòng lặp in số trang 1, 2, 3... */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => paginate(page)} // SỬ DỤNG HÀM PAGINATE TẠI ĐÂY
                        className={`w-8 h-8 rounded-md text-sm font-medium transition ${
                          currentPage === page
                            ? "bg-blue-600 text-white shadow-sm"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}

                  {/* Nút Sau */}
                  <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                      currentPage === totalPages
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    Tiếp
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>

      {/* --- MODAL CHI TIẾT SẢN PHẨM --- */}
      {showDetailModal && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-all">
          <div className="bg-white rounded-xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  Chi tiết đóng hàng
                </h3>
                <p className="text-sm text-gray-500">
                  Đơn hàng: #{selectedOrder._id.slice(-6).toUpperCase()}
                </p>
              </div>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-red-500 transition p-2 bg-white rounded-full border hover:bg-red-50"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="p-6 overflow-y-auto custom-scrollbar bg-gray-50/50">
              <div className="space-y-4">
                {selectedOrder.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm"
                  >
                    <div className="w-24 h-24 shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                      <img
                        src={
                          Array.isArray(item.image) ? item.image[0] : item.image
                        }
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-base font-bold text-gray-800 leading-snug">
                          {item.name}
                        </h4>
                        <p className="text-sm text-gray-500 mt-1">
                          Mã SP: {item._id.slice(-4)}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-end gap-4 mt-3">
                        <div className="bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
                          <span className="text-xs text-blue-600 uppercase font-bold tracking-wider">
                            Size/Loại
                          </span>
                          <p className="text-lg font-bold text-blue-800 leading-none mt-1">
                            {item.size}
                          </p>
                        </div>

                        <div className="bg-orange-50 px-3 py-1.5 rounded-lg border border-orange-100">
                          <span className="text-xs text-orange-600 uppercase font-bold tracking-wider">
                            Số lượng
                          </span>
                          <p className="text-lg font-bold text-orange-800 leading-none mt-1">
                            x{item.quantity}
                          </p>
                        </div>

                        <div className="ml-auto text-right">
                          <p className="text-xs text-gray-500">Đơn giá</p>
                          <p className="font-semibold text-gray-700">
                            {item.price.toLocaleString("vi-VN")}
                            {currency}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-end items-center gap-4 pt-4 border-t border-gray-200">
                <div className="text-right">
                  <p className="text-sm text-gray-500">Tổng tiền hàng</p>
                  <p className="text-xl font-bold text-red-600">
                    {selectedOrder.amount.toLocaleString("vi-VN")}
                    {currency}
                  </p>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 bg-white flex justify-end">
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 shadow-md transition"
              >
                Xác nhận đã kiểm tra
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
