import React, { useState } from "react";

const SimpleChart = ({ data, title, type = "bar" }) => {
  // State quản lý Modal cho Donut Chart trên mobile
  const [showModal, setShowModal] = useState(false);

  // Mảng màu dùng chung để đồng bộ màu giữa Biểu đồ - Legend - Modal
  const COLORS = ["#22c55e", "#3b82f6", "#f97316", "#a855f7", "#ef4444"];
  const BG_COLORS = ["bg-green-500", "bg-blue-500", "bg-orange-500", "bg-purple-500", "bg-red-500"];

  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
        <div className="text-center text-gray-500 py-8">
          <p>Không có dữ liệu để hiển thị</p>
        </div>
      </div>
    );
  }

  const maxValue = Math.max(...data.map((item) => item.value || 0));
  const totalValue = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-md flex flex-col h-full">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">{title}</h3>

        {/* --- BAR CHART (GIỮ NGUYÊN) --- */}
        {type === "bar" && (
          <div className="space-y-4">
            {data.map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="w-20 text-sm text-gray-600 font-medium mr-4">
                  {item.label}
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-4 relative">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-4 rounded-full transition-all duration-300"
                    style={{ width: `${(item.value / maxValue) * 100}%` }}
                  ></div>
                </div>
                <div className="w-16 text-right text-sm font-semibold text-gray-700 ml-4">
                  {typeof item.value === "number"
                    ? item.value.toLocaleString()
                    : item.value}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --- LINE CHART (GIỮ NGUYÊN) --- */}
        {type === "line" && (
          <div className="relative h-64">
            <div className="absolute inset-0 flex items-end justify-around">
              {data.map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className="w-8 bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg transition-all duration-300"
                    style={{ height: `${(item.value / maxValue) * 200}px` }}
                  ></div>
                  <div className="text-xs text-gray-600 mt-2 text-center">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- PIE CHART (GIỮ NGUYÊN) --- */}
        {type === "pie" && (
          <div className="flex flex-col md:flex-row items-center gap-6">
            <svg width="160" height="160" viewBox="0 0 42 42">
              <circle cx="21" cy="21" r="15.9155" fill="transparent" stroke="#e5e7eb" strokeWidth="6" />
              {(() => {
                let offset = 0;
                return data.map((item, index) => {
                  const percent = (item.value / totalValue) * 100;
                  const strokeDasharray = `${percent} ${100 - percent}`;
                  const strokeDashoffset = 100 - offset;
                  offset += percent;
                  return (
                    <circle
                      key={index} cx="21" cy="21" r="15.9155" fill="transparent"
                      stroke={COLORS[index % COLORS.length]} strokeWidth="6"
                      strokeDasharray={strokeDasharray} strokeDashoffset={strokeDashoffset}
                    />
                  );
                });
              })()}
            </svg>
            <div className="space-y-2 w-full">
              {data.map((item, index) => {
                const percent = ((item.value / totalValue) * 100).toFixed(1);
                return (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full ${BG_COLORS[index % BG_COLORS.length]}`}></span>
                      <span className="text-gray-700">{item.label}</span>
                    </div>
                    <span className="font-semibold text-gray-800">
                      {item.value} ({percent}%)
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* --- DONUT CHART (SỬA ĐỔI CHO MOBILE) --- */}
        {type === "donut" && (
          <div className="flex flex-col md:grid md:grid-cols-2 gap-6 items-center h-full">
            {/* 1. Vòng tròn biểu đồ */}
            <div
              className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 mx-auto rounded-full shrink-0"
              style={{
                background: `conic-gradient(${data
                  .map((item, i) => {
                    const start = (data.slice(0, i).reduce((s, d) => s + d.value, 0) / totalValue) * 360;
                    const end = start + (item.value / totalValue) * 360;
                    return `${COLORS[i % COLORS.length]} ${start}deg ${end}deg`;
                  })
                  .join(",")})`,
              }}
            >
              <div className="absolute inset-6 sm:inset-7 bg-white rounded-full flex items-center justify-center text-sm font-semibold text-gray-700 shadow-inner">
                Tổng
              </div>
            </div>

            {/* 2. Nút xem chi tiết (CHỈ HIỆN TRÊN MOBILE < sm) */}
            <div className="w-full text-center sm:hidden mt-2">
              <button
                onClick={() => setShowModal(true)}
                className="px-4 py-2 bg-blue-50 text-blue-600 text-sm font-medium rounded-full hover:bg-blue-100 transition-colors inline-flex items-center gap-2"
              >
                <span>Xem chi tiết</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>

            {/* 3. Legend danh sách (CHỈ HIỆN TRÊN DESKTOP >= sm) */}
            <div className="hidden sm:block space-y-3 w-full px-4">
              {data.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div
                    className="w-3 h-3 rounded-full mt-1 shrink-0"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <div className="flex-1 min-w-0 flex items-center">
                    <p className="text-sm text-gray-700 font-medium line-clamp-2 flex-1 leading-snug">
                      {item.label}
                    </p>
                    <p className="text-sm text-gray-600 font-semibold ml-4 whitespace-nowrap">
                      {item.value.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* --- MODAL HIỂN THỊ CHI TIẾT (MOBILE ONLY) --- */}
      {showModal && type === "donut" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setShowModal(false)}
          ></div>
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden z-10 animate-fade-in-up">
            <div className="bg-gray-50 px-5 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-800">Top Sản Phẩm Bán Chạy</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="px-5 py-4 max-h-[60vh] overflow-y-auto">
              <div className="space-y-4">
                {data.map((item, index) => {
                  const percent = ((item.value / totalValue) * 100).toFixed(1);
                  return (
                    <div key={index} className="flex items-start gap-3 pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white font-bold shrink-0 ${BG_COLORS[index % BG_COLORS.length]}`}>
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800 leading-snug mb-1">{item.label}</p>
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                          <div className={`h-1.5 rounded-full ${BG_COLORS[index % BG_COLORS.length]}`} style={{ width: `${percent}%` }}></div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-bold text-gray-800">{item.value}</p>
                        <p className="text-xs text-gray-500">{percent}%</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3 border-t border-gray-100 text-center">
              <button onClick={() => setShowModal(false)} className="text-sm font-medium text-gray-600 hover:text-gray-800">
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SimpleChart;