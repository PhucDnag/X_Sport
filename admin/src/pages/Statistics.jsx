import React, { useState, useEffect, useCallback } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import axios from "axios";
import SimpleChart from "../components/SimpleChart";
import QuickStats from "../components/QuickStats";

const Statistics = ({ token }) => {
  const [overallStats, setOverallStats] = useState({});
  const [revenueStats, setRevenueStats] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [orderStats, setOrderStats] = useState({});
  const [productStats, setProductStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  // Fetch overall statistics
  const fetchOverallStats = useCallback(async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/statistics/overview`,
        {
          headers: { token },
        }
      );
      if (response.data.success) {
        setOverallStats(response.data.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Lỗi khi tải thống kê tổng quan");
    }
  }, [token]);

  // Fetch revenue statistics
  const fetchRevenueStats = useCallback(async () => {
    try {
      let url = `${backendUrl}/api/statistics/revenue?period=${selectedPeriod}&year=${selectedYear}`;
      if (selectedPeriod === "day") {
        url += `&month=${selectedMonth}`;
      }

      const response = await axios.get(url, {
        headers: { token },
      });
      if (response.data.success) {
        setRevenueStats(response.data.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Lỗi khi tải thống kê doanh thu");
    }
  }, [selectedPeriod, selectedYear, selectedMonth, token]);

  // Fetch top products
  const fetchTopProducts = useCallback(async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/statistics/top-products?limit=5`,
        {
          headers: { token },
        }
      );
      if (response.data.success) {
        setTopProducts(response.data.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Lỗi khi tải sản phẩm bán chạy");
    }
  }, [token]);

  // Fetch order statistics
  const fetchOrderStats = useCallback(async () => {
    try {
      let url = `${backendUrl}/api/statistics/orders?period=${selectedPeriod}&year=${selectedYear}`;
      if (selectedPeriod === "day") {
        url += `&month=${selectedMonth}`;
      }

      const response = await axios.get(url, {
        headers: { token },
      });
      if (response.data.success) {
        setOrderStats(response.data.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Lỗi khi tải thống kê đơn hàng");
    }
  }, [selectedPeriod, selectedYear, selectedMonth, token]);

  // Fetch product statistics
  const fetchProductStats = useCallback(async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/statistics/products`,
        {
          headers: { token },
        }
      );
      if (response.data.success) {
        setProductStats(response.data.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Lỗi khi tải thống kê sản phẩm");
    }
  }, [token]);

  // Load all statistics
  const loadAllStats = useCallback(async () => {
    setLoading(true);
    await Promise.all([
      fetchOverallStats(),
      fetchRevenueStats(),
      fetchTopProducts(),
      fetchOrderStats(),
      fetchProductStats(),
    ]);
    setLoading(false);
  }, [
    fetchOverallStats,
    fetchRevenueStats,
    fetchTopProducts,
    fetchOrderStats,
    fetchProductStats,
  ]);

  useEffect(() => {
    loadAllStats();
  }, [loadAllStats]);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN").format(amount) + " đ";
  };

  // Get period label
  const getPeriodLabel = (id) => {
    if (selectedPeriod === "day") {
      return `Ngày ${id}`;
    } else if (selectedPeriod === "month") {
      return `Tháng ${id}`;
    } else {
      return `Năm ${id}`;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Thống kê & Báo cáo
      </h1>

      {/* Time Period Selector */}
      <div className="mb-8 bg-white p-4 rounded-lg shadow-md">
        <div className="flex flex-wrap gap-4 items-center">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Thời gian
            </label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="year">Theo năm</option>
              <option value="month">Theo tháng</option>
              <option value="day">Theo ngày</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Năm
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Array.from(
                { length: 5 },
                (_, i) => new Date().getFullYear() - i
              ).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {selectedPeriod === "day" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tháng
              </label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                  <option key={month} value={month}>
                    Tháng {month}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Overall Statistics Cards */}
      <QuickStats token={token} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Chart */}
        <SimpleChart
          data={revenueStats.map((item) => ({
            label: getPeriodLabel(item._id),
            value: item.revenue,
          }))}
          title="Doanh thu theo thời gian"
          type="bar"
        />

        {/* Top Products */}
        <SimpleChart
          data={topProducts.map((p, i) => ({
            label: `${i + 1}. ${p.productName}`,
            value: p.totalQuantity,
          }))}
          title="Top sản phẩm bán chạy"
          type="donut"
        />

        {/* Payment Methods */}
        <SimpleChart
          data={
            orderStats.ordersByPaymentMethod?.map((method) => ({
              label: method._id,
              value: method.count,
            })) || []
          }
          title="Phương thức thanh toán"
          type="pie"
        />

        {/* Product Categories */}
        <SimpleChart
          data={
            productStats.productsByCategory?.map((category) => ({
              label: category._id,
              value: category.count,
            })) || []
          }
          title="Sản phẩm theo danh mục"
          type="bar"
        />
      </div>
    </div>
  );
};

export default Statistics;
