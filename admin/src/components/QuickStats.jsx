import React, { useState, useEffect } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import axios from "axios";

const QuickStats = ({ token, filters }) => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  // Helper format tiền tệ
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN").format(amount) + " đ";
  };

  useEffect(() => {
    // 1. Tạo biến flag để kiểm soát việc component còn mounted hay không
    // và AbortController để hủy request cũ nếu user click quá nhanh
    let isMounted = true; 
    const controller = new AbortController();

    const fetchStats = async () => {
      if (!token) return;

      try {
        setLoading(true);
        const { period, year, month, day } = filters;

        let query = `period=${period}`;
        if (period !== "all") query += `&year=${year}`;
        if (period === "month" || period === "day") query += `&month=${month}`;
        if (period === "day") query += `&day=${day}`;

        const response = await axios.get(
          `${backendUrl}/api/statistics/overview?${query}`,
          {
            headers: { token },
            signal: controller.signal, // Gắn tín hiệu hủy vào axios
          }
        );

        // Chỉ cập nhật state nếu component còn mounted và request chưa bị hủy
        if (isMounted && response.data.success) {
          setStats(response.data.data);
        }
      } catch (error) {
        // Bỏ qua lỗi nếu do chính mình hủy request (khi user đổi filter nhanh)
        if (axios.isCancel(error)) {
          console.log("Request cancelled:", error.message);
        } else {
          console.log(error);
          toast.error("Lỗi khi tải thống kê");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchStats();

    // Cleanup function: Chạy khi filters thay đổi hoặc component unmount
    return () => {
      isMounted = false;
      controller.abort(); // Hủy request đang chạy dở
    };
  }, [filters, token]);

  // --- LOGIC HIỂN THỊ TỐI ƯU ---
  
  // Kiểm tra xem đã có dữ liệu lần nào chưa
  const hasData = Object.keys(stats).length > 0;

  // Trường hợp 1: Mới vào trang lần đầu, chưa có dữ liệu -> Hiện Skeleton
  if (loading && !hasData) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
        ))}
      </div>
    );
  }

  // Trường hợp 2: Đã có dữ liệu (đang lọc lại) -> Hiện dữ liệu cũ nhưng làm mờ
  // Giúp giao diện không bị giật
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-8 transition-opacity duration-300 ${loading ? "opacity-50 pointer-events-none" : "opacity-100"}`}>
      
      {/* Doanh thu */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg shadow-lg transform transition-transform">
        <div className="flex flex-col gap-2">
          <p className="text-blue-100 text-sm font-medium">Doanh thu</p>
          <div className="flex items-center justify-between">
            <p className="text-base md:text-xl font-bold tracking-tight">
              {formatCurrency(stats.totalRevenue || 0)}
            </p>
            <div className="hidden sm:inline-block p-2 bg-blue-400 bg-opacity-30 rounded-full">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Đơn hàng */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg transform transition-transform">
        <div className="flex flex-col gap-2">
          <p className="text-green-100 text-sm font-medium">Số đơn hàng</p>
          <div className="flex items-center justify-between">
            <p className="text-base md:text-xl font-bold tracking-tight">
              {stats.totalOrders || 0}
            </p>
            <div className="hidden sm:inline-block p-2 bg-green-400 bg-opacity-30 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Khách hàng */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-lg transform transition-transform">
        <div className="flex flex-col gap-2">
          <p className="text-purple-100 text-sm font-medium">
            {filters.period === "all" ? "Tổng khách hàng" : "Khách hàng mới"}
          </p>
          <div className="flex items-center justify-between">
            <p className="text-base md:text-xl font-bold tracking-tight">
              {stats.totalUsers || 0}
            </p>
            <div className="hidden sm:inline-block p-2 bg-purple-400 bg-opacity-30 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Sản phẩm */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-lg shadow-lg transform transition-transform">
        <div className="flex flex-col gap-2">
          <p className="text-orange-100 text-sm font-medium">
            {filters.period === "all" ? "Tổng sản phẩm" : "Sản phẩm thêm mới"}
          </p>
          <div className="flex items-center justify-between">
            <p className="text-base md:text-xl font-bold tracking-tight">
              {stats.totalProducts || 0}
            </p>
             <div className="hidden sm:inline-block p-2 bg-orange-400 bg-opacity-30 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickStats;