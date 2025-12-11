import React, { useState, useEffect, useCallback } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import axios from "axios";
import SimpleChart from "../components/SimpleChart";
import QuickStats from "../components/QuickStats";

const Statistics = ({ token }) => {
  const [revenueStats, setRevenueStats] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [orderStats, setOrderStats] = useState({});
  const [productStats, setProductStats] = useState({});
  const [loading, setLoading] = useState(true);

  // Filter states
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());

  // Helper tạo query string
  const getQueryParams = useCallback(() => {
    let query = `period=${selectedPeriod}`;
    if (selectedPeriod !== "all") query += `&year=${selectedYear}`;
    if (selectedPeriod === "month" || selectedPeriod === "day") query += `&month=${selectedMonth}`;
    if (selectedPeriod === "day") query += `&day=${selectedDay}`;
    return query;
  }, [selectedPeriod, selectedYear, selectedMonth, selectedDay]);

  // 1. Fetch Revenue
  const fetchRevenueStats = useCallback(async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/statistics/revenue?${getQueryParams()}`,
        { headers: { token } }
      );
      if (response.data.success) setRevenueStats(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }, [getQueryParams, token]);

  // 2. Fetch Order Stats (Payment Method) - CÓ FILTER
  const fetchOrderStats = useCallback(async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/statistics/orders?${getQueryParams()}`,
        { headers: { token } }
      );
      if (response.data.success) setOrderStats(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }, [getQueryParams, token]);

  // 3. Fetch Product Stats (Category) - CÓ FILTER
  const fetchProductStats = useCallback(async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/statistics/products?${getQueryParams()}`,
        { headers: { token } }
      );
      if (response.data.success) setProductStats(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }, [getQueryParams, token]);

  // 4. Fetch Top Products (Giữ nguyên)
  const fetchTopProducts = useCallback(async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/statistics/top-products?limit=5`,
        { headers: { token } }
      );
      if (response.data.success) setTopProducts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  // Load All
  const loadAllStats = useCallback(async () => {
    setLoading(true);
    await Promise.all([
      fetchRevenueStats(),
      fetchOrderStats(),
      fetchProductStats(),
      fetchTopProducts(),
    ]);
    setLoading(false);
  }, [fetchRevenueStats, fetchOrderStats, fetchProductStats, fetchTopProducts]);

  useEffect(() => {
    loadAllStats();
  }, [loadAllStats]);

  // Helper functions
  const getChartLabel = (id) => {
    if (selectedPeriod === "day") return `${id}:00`;
    if (selectedPeriod === "month") return `Ngày ${id}`;
    if (selectedPeriod === "year") return `Tháng ${id}`;
    return `Năm ${id}`;
  };
  const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate();

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Thống kê & Báo cáo</h1>

      {/* Filter Section */}
      <div className="mb-8 bg-white p-4 rounded-lg shadow-md">
        <div className="flex flex-wrap gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Xem theo</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 min-w-[120px]"
            >
              <option value="day">Ngày cụ thể</option>
              <option value="month">Tháng cụ thể</option>
              <option value="year">Năm cụ thể</option>
              <option value="all">Tất cả thời gian</option>
            </select>
          </div>

          {selectedPeriod !== "all" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Năm</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="border border-gray-300 rounded-md px-3 py-2"
              >
                {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          )}

          {(selectedPeriod === "month" || selectedPeriod === "day") && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tháng</label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                className="border border-gray-300 rounded-md px-3 py-2"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <option key={m} value={m}>Tháng {m}</option>
                ))}
              </select>
            </div>
          )}

          {selectedPeriod === "day" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ngày</label>
              <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(parseInt(e.target.value))}
                className="border border-gray-300 rounded-md px-3 py-2"
              >
                {Array.from({ length: getDaysInMonth(selectedYear, selectedMonth) }, (_, i) => i + 1).map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats - Sẽ cập nhật Total Products theo filter */}
      <QuickStats 
        token={token} 
        filters={{ period: selectedPeriod, year: selectedYear, month: selectedMonth, day: selectedDay }} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 1. Doanh thu Chart */}
        {loading ? <p>Đang tải...</p> : (
            <SimpleChart
            data={revenueStats.map((item) => ({
                label: getChartLabel(item._id),
                value: item.revenue,
            }))}
            title={selectedPeriod === 'all' ? "Doanh thu các năm" : "Biểu đồ doanh thu chi tiết"}
            type="bar"
            />
        )}

        {/* 2. Top Products */}
        <SimpleChart
          data={topProducts.map((p, i) => ({
            label: `${i + 1}. ${p.productName}`,
            value: p.totalQuantity,
          }))}
          title="Top 5 sản phẩm bán chạy nhất"
          type="donut"
        />

        {/* 3. Payment Methods - Mới thêm lại */}
        <SimpleChart
            data={
                orderStats.ordersByPaymentMethod?.map((method) => ({
                    label: method._id,
                    value: method.count,
                })) || []
            }
            title={`Phương thức thanh toán (${selectedPeriod === 'all' ? 'Tất cả' : 'Theo lọc'})`}
            type="pie"
        />

        {/* 4. Product Categories - Mới thêm lại */}
        <SimpleChart
            data={
                productStats.productsByCategory?.map((category) => ({
                    label: category._id,
                    value: category.count,
                })) || []
            }
            title={`Sản phẩm thêm mới theo thương hiệu (${selectedPeriod === 'all' ? 'Tất cả' : 'Theo lọc'})`}
            type="bar"
        />
      </div>
    </div>
  );
};

export default Statistics;