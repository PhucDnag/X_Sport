import React, { useState, useEffect } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import axios from "axios";

const QuickStats = ({ token }) => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/statistics/overview`,
        {
          headers: { token },
        }
      );
      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (error) {
      toast.error("Lỗi khi tải thống kê");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN").format(amount) + " đ";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  return (
    <>
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-500 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg h-full">
          <div className="flex flex-col justify-center h-full gap-2">
            {/* Dòng tiêu đề */}
            <p className="text-blue-100 text-sm">Tổng doanh thu</p>

            {/* Dòng số tiền + icon cùng hàng */}
            <div className="flex items-center justify-between">
              <p className="text-base font-bold whitespace-nowrap">
                {formatCurrency(stats.totalRevenue || 0)}
              </p>

              <div className="text-blue-200 flex items-center justify-center">
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                  <path
                    fillRule="evenodd"
                    d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-green-500 bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg h-full">
          <div className="flex flex-col justify-center h-full gap-2">
            <p className="text-green-100 text-sm">Tổng đơn hàng</p>

            <div className="flex items-center justify-between">
              <p className="text-base font-bold whitespace-nowrap">
                {stats.totalOrders || 0}
              </p>

              <div className="text-green-200">
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
                  <circle cx="7" cy="17" r="2" />
                  <circle cx="17" cy="17" r="2" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-purple-500 bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-lg h-full">
          <div className="flex flex-col justify-center h-full gap-2">
            <p className="text-purple-100 text-sm">Tổng khách hàng</p>

            <div className="flex items-center justify-between">
              <p className="text-base font-bold whitespace-nowrap">
                {stats.totalUsers || 0}
              </p>

              <div className="text-purple-200">
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 10a4 4 0 100-8 4 4 0 000 8zm-7 8a7 7 0 0114 0H3z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-orange-500 bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-lg shadow-lg h-full">
          <div className="flex flex-col justify-center h-full gap-2">
            <p className="text-orange-100 text-sm">Tổng sản phẩm</p>

            <div className="flex items-center justify-between">
              <p className="text-base font-bold whitespace-nowrap">
                {stats.totalProducts || 0}
              </p>

              <div className="text-orange-200">
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 6l8-4 8 4v8l-8 4-8-4V6z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuickStats;
