import React, { useState, useEffect, useCallback, useRef } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import axios from "axios";
import SimpleChart from "../components/SimpleChart";
import QuickStats from "../components/QuickStats";

// Import thư viện
import { toPng } from 'html-to-image';
import jsPDF from "jspdf";

const Statistics = ({ token }) => {
  const [revenueStats, setRevenueStats] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [orderStats, setOrderStats] = useState({});
  const [productStats, setProductStats] = useState({});
  const [loading, setLoading] = useState(true);
  
  const [exporting, setExporting] = useState(false);
  const [exportTime, setExportTime] = useState("");

  // Refs cho các phần cần chụp
  const reportRef = useRef(null);      // Phần biểu đồ (Visible)
  const pdfHeaderRef = useRef(null);   // Phần tiêu đề PDF (Hidden)
  const pdfFooterRef = useRef(null);   // Phần chân trang PDF (Hidden)

  // Filter states
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());

  // --- LOGIC FETCH API ---
  const getQueryParams = useCallback(() => {
    let query = `period=${selectedPeriod}`;
    if (selectedPeriod !== "all") query += `&year=${selectedYear}`;
    if (selectedPeriod === "month" || selectedPeriod === "day") query += `&month=${selectedMonth}`;
    if (selectedPeriod === "day") query += `&day=${selectedDay}`;
    return query;
  }, [selectedPeriod, selectedYear, selectedMonth, selectedDay]);

  const fetchRevenueStats = useCallback(async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/statistics/revenue?${getQueryParams()}`, { headers: { token } });
      if (response.data.success) setRevenueStats(response.data.data);
    } catch (error) { console.log(error); }
  }, [getQueryParams, token]);

  const fetchOrderStats = useCallback(async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/statistics/orders?${getQueryParams()}`, { headers: { token } });
      if (response.data.success) setOrderStats(response.data.data);
    } catch (error) { console.log(error); }
  }, [getQueryParams, token]);

  const fetchProductStats = useCallback(async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/statistics/products?${getQueryParams()}`, { headers: { token } });
      if (response.data.success) setProductStats(response.data.data);
    } catch (error) { console.log(error); }
  }, [getQueryParams, token]);

  const fetchTopProducts = useCallback(async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/statistics/top-products?limit=5`, { headers: { token } });
      if (response.data.success) setTopProducts(response.data.data);
    } catch (error) { console.log(error); }
  }, [token]);

  const loadAllStats = useCallback(async () => {
    setLoading(true);
    await Promise.all([fetchRevenueStats(), fetchOrderStats(), fetchProductStats(), fetchTopProducts()]);
    setLoading(false);
  }, [fetchRevenueStats, fetchOrderStats, fetchProductStats, fetchTopProducts]);

  useEffect(() => {
    loadAllStats();
  }, [loadAllStats]);

  // --- HÀM XỬ LÝ NHÃN BIỂU ĐỒ (ĐÃ FIX GIỜ VIỆT NAM) ---
  const getChartLabel = (id) => {
    if (selectedPeriod === "day") {
      // Backend trả về id là giờ UTC (0, 1, ..., 23)
      // Cộng 7 để chuyển sang giờ Việt Nam
      // Dùng % 24 để xử lý trường hợp qua ngày (ví dụ 20h UTC + 7 = 27 -> 3h sáng)
      const vnHour = (parseInt(id) + 7) % 24;
      return `${vnHour}:00`; 
    }
    if (selectedPeriod === "month") return `Ngày ${id}`;
    if (selectedPeriod === "year") return `Tháng ${id}`;
    return `Năm ${id}`;
  };

  const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate();

  // --- HÀM XUẤT PDF ---
  const exportToPDF = async () => {
    if (!reportRef.current || !pdfHeaderRef.current || !pdfFooterRef.current) return;
    setExporting(true);

    try {
      // 1. Cập nhật thời gian thực tế vào state để render ra DOM ẩn
      const now = new Date();
      const timeString = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
      setExportTime(timeString);

      // Chờ 500ms để React render xong DOM và font chữ load đầy đủ
      await new Promise(resolve => setTimeout(resolve, 500));

      const captureOptions = { 
        cacheBust: true, 
        backgroundColor: '#ffffff',
        pixelRatio: 2, // Tăng độ nét
      };

      // 2. Chụp ảnh 3 phần: Header, Body, Footer
      const headerDataUrl = await toPng(pdfHeaderRef.current, captureOptions);
      const bodyDataUrl = await toPng(reportRef.current, captureOptions);
      const footerDataUrl = await toPng(pdfFooterRef.current, captureOptions);

      // 3. Khởi tạo PDF
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth(); // ~210mm
      const pdfHeight = pdf.internal.pageSize.getHeight(); // ~297mm
      
      // -- CHÈN HEADER --
      const headerProps = pdf.getImageProperties(headerDataUrl);
      const headerHeight = (headerProps.height * pdfWidth) / headerProps.width;
      pdf.addImage(headerDataUrl, "PNG", 0, 0, pdfWidth, headerHeight);

      // -- CHÈN BODY (BIỂU ĐỒ) --
      const bodyProps = pdf.getImageProperties(bodyDataUrl);
      const bodyHeight = (bodyProps.height * pdfWidth) / bodyProps.width;
      const bodyY = headerHeight; // Nối tiếp ngay sau header
      
      // Nếu biểu đồ dài quá trang A4 (cộng thêm header và footer)
      if (bodyHeight + headerHeight + 20 > pdfHeight) {
          pdf.addImage(bodyDataUrl, "PNG", 0, bodyY, pdfWidth, bodyHeight);
      } else {
          pdf.addImage(bodyDataUrl, "PNG", 0, bodyY, pdfWidth, bodyHeight);
      }

      // -- CHÈN FOOTER --
      const footerProps = pdf.getImageProperties(footerDataUrl);
      const footerHeight = (footerProps.height * pdfWidth) / footerProps.width;
      const footerY = bodyY + bodyHeight;
      
      // Nếu footer bị tràn trang, thêm trang mới
      if (footerY + footerHeight > pdfHeight) {
          pdf.addPage();
          pdf.addImage(footerDataUrl, "PNG", 0, 10, pdfWidth, footerHeight);
      } else {
          pdf.addImage(footerDataUrl, "PNG", 0, footerY, pdfWidth, footerHeight);
      }

      // 4. Lưu file
      const dateFileStr = now.toISOString().slice(0, 10);
      pdf.save(`Bao_cao_XSport_${dateFileStr}.pdf`);
      toast.success("Xuất báo cáo thành công!");

    } catch (err) {
      console.error("Lỗi xuất PDF:", err);
      toast.error("Có lỗi khi xuất PDF. Vui lòng thử lại.");
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto relative">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Thống kê & Báo cáo</h1>
        
        <button
          onClick={exportToPDF}
          disabled={exporting || loading}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-white font-medium shadow-sm transition-all
            ${exporting 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-red-600 hover:bg-red-700 hover:shadow-md active:transform active:scale-95'
            }`}
        >
          {exporting ? (
             <>
               <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
               </svg>
               <span>Đang tạo file...</span>
             </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Xuất Báo Cáo PDF</span>
            </>
          )}
        </button>
      </div>

      {/* --- PHẦN HIỂN THỊ TRÊN WEB (BODY) --- */}
      <div ref={reportRef} className="bg-gray-50 p-4 rounded-xl"> 
        {/* Filter Section */}
        <div className="mb-8 bg-white p-4 rounded-lg shadow-md">
          <div className="flex flex-wrap gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Xem theo</label>
              <select value={selectedPeriod} onChange={(e) => setSelectedPeriod(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 min-w-[120px]">
                <option value="day">Ngày cụ thể</option>
                <option value="month">Tháng cụ thể</option>
                <option value="year">Năm cụ thể</option>
                <option value="all">Tất cả thời gian</option>
              </select>
            </div>
            {selectedPeriod !== "all" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Năm</label>
                <select value={selectedYear} onChange={(e) => setSelectedYear(parseInt(e.target.value))} className="border border-gray-300 rounded-md px-3 py-2">
                  {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map((y) => (<option key={y} value={y}>{y}</option>))}
                </select>
              </div>
            )}
            {(selectedPeriod === "month" || selectedPeriod === "day") && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tháng</label>
                <select value={selectedMonth} onChange={(e) => setSelectedMonth(parseInt(e.target.value))} className="border border-gray-300 rounded-md px-3 py-2">
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (<option key={m} value={m}>Tháng {m}</option>))}
                </select>
              </div>
            )}
            {selectedPeriod === "day" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ngày</label>
                <select value={selectedDay} onChange={(e) => setSelectedDay(parseInt(e.target.value))} className="border border-gray-300 rounded-md px-3 py-2">
                  {Array.from({ length: getDaysInMonth(selectedYear, selectedMonth) }, (_, i) => i + 1).map((d) => (<option key={d} value={d}>{d}</option>))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Thống kê nhanh */}
        <QuickStats
          token={token}
          filters={{ period: selectedPeriod, year: selectedYear, month: selectedMonth, day: selectedDay }}
        />

        {/* Biểu đồ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {loading ? <p>Đang tải...</p> : (
            <SimpleChart
              data={revenueStats.map((item) => ({ label: getChartLabel(item._id), value: item.revenue, }))}
              title={selectedPeriod === 'all' ? "Doanh thu các năm" : "Biểu đồ doanh thu chi tiết"}
              type="bar"
            />
          )}
          <SimpleChart data={topProducts.map((p, i) => ({ label: `${i + 1}. ${p.productName}`, value: p.totalQuantity, }))} title="Top 5 sản phẩm bán chạy nhất" type="donut" />
          <SimpleChart data={orderStats.ordersByPaymentMethod?.map((method) => ({ label: method._id, value: method.count, })) || []} title={`Phương thức thanh toán`} type="pie" />
          <SimpleChart data={productStats.productsByCategory?.map((category) => ({ label: category._id, value: category.count, })) || []} title={`Sản phẩm mới thêm theo thương hiệu`} type="bar" />
        </div>
      </div> 

      {/* --- CÁC THÀNH PHẦN ẨN ĐỂ IN PDF --- */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: 0, height: 0, overflow: 'hidden' }}>
        
        {/* 1. Header PDF Layout */}
        <div 
            ref={pdfHeaderRef} 
            style={{ 
                width: '800px', 
                background: 'white', 
                padding: '40px 40px 20px 40px',
                color: '#000' 
            }}
        >
             <div style={{ borderBottom: '3px solid #dc2626', paddingBottom: '16px', marginBottom: '16px' }}>
                 <h1 style={{ fontSize: '32px', fontWeight: 'bold', textTransform: 'uppercase', color: '#111827', marginBottom: '12px' }}>
                    Hệ thống bán vợt cầu lông X-Sport
                 </h1>
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <p style={{ fontSize: '20px', fontWeight: '500', color: '#4b5563' }}>Báo cáo hoạt động kinh doanh</p>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: '14px', color: '#6b7280', fontStyle: 'italic' }}>Người xuất báo cáo:</p>
                        <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#1f2937' }}>Quản trị viên X_Sport</p>
                    </div>
                 </div>
             </div>
        </div>

        {/* 2. Footer PDF Layout */}
        <div 
            ref={pdfFooterRef} 
            style={{ 
                width: '800px', 
                background: 'white', 
                padding: '20px 40px 40px 40px',
                color: '#000'
            }}
        >
             <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '16px', marginTop: '10px', textAlign: 'right' }}>
                 <p style={{ fontSize: '14px', color: '#6b7280', fontStyle: 'italic' }}>
                   {exportTime ? `Thời gian xuất báo cáo: ${exportTime}` : "Đang cập nhật thời gian..."}
                 </p>
                 <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>
                   Tài liệu lưu hành nội bộ - X-Sport System
                 </p>
             </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;