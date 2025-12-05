import React from "react";

const SimpleChart = ({ data, title, type = "bar" }) => {
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

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">{title}</h3>

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

      {type === "pie" && (
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Donut Chart */}
          <svg width="160" height="160" viewBox="0 0 42 42">
            <circle
              cx="21"
              cy="21"
              r="15.9155"
              fill="transparent"
              stroke="#e5e7eb"
              strokeWidth="6"
            />

            {(() => {
              const total = data.reduce((sum, d) => sum + d.value, 0);
              let offset = 0;
              const colors = [
                "#3b82f6",
                "#22c55e",
                "#a855f7",
                "#f97316",
                "#ef4444",
              ];

              return data.map((item, index) => {
                const percent = (item.value / total) * 100;
                const strokeDasharray = `${percent} ${100 - percent}`;
                const strokeDashoffset = 100 - offset;
                offset += percent;

                return (
                  <circle
                    key={index}
                    cx="21"
                    cy="21"
                    r="15.9155"
                    fill="transparent"
                    stroke={colors[index % colors.length]}
                    strokeWidth="6"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                  />
                );
              });
            })()}
          </svg>

          {/* Legend */}
          <div className="space-y-2 w-full">
            {(() => {
              const total = data.reduce((sum, d) => sum + d.value, 0);
              const colors = [
                "bg-blue-500",
                "bg-green-500",
                "bg-purple-500",
                "bg-orange-500",
                "bg-red-500",
              ];

              return data.map((item, index) => {
                const percent = ((item.value / total) * 100).toFixed(1);

                return (
                  <div
                    key={index}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-3 h-3 rounded-full ${
                          colors[index % colors.length]
                        }`}
                      ></span>
                      <span className="text-gray-700">{item.label}</span>
                    </div>

                    <span className="font-semibold text-gray-800">
                      {item.value} ({percent}%)
                    </span>
                  </div>
                );
              });
            })()}
          </div>
        </div>
      )}

      {type === "donut" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Donut */}
          <div
            className="relative w-40 h-40 mx-auto rounded-full"
            style={{
              background: `conic-gradient(
          ${data
            .map((item, i) => {
              const total = data.reduce((s, d) => s + d.value, 0);
              const start =
                (data.slice(0, i).reduce((s, d) => s + d.value, 0) / total) *
                360;
              const end = start + (item.value / total) * 360;
              const colors = [
                "#22c55e",
                "#3b82f6",
                "#f97316",
                "#a855f7",
                "#ef4444",
              ];
              return `${colors[i % colors.length]} ${start}deg ${end}deg`;
            })
            .join(",")}
        )`,
            }}
          >
            <div className="absolute inset-6 bg-white rounded-full flex items-center justify-center text-sm font-semibold text-gray-700">
              Tổng
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-3">
            {data.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                {/* Color dot */}
                <div
                  className="w-3 h-3 rounded-full mt-1 shrink-0"
                  style={{
                    backgroundColor: [
                      "#22c55e",
                      "#3b82f6",
                      "#f97316",
                      "#a855f7",
                      "#ef4444",
                    ][index % 5],
                  }}
                />

                {/* Text + Value */}
                <div className="flex-1 min-w-0 flex items-center">
                  {/* Label */}
                  <p className="text-sm text-gray-700 font-medium line-clamp-2 flex-1 leading-snug">
                    {item.label}
                  </p>

                  {/* Value */}
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
  );
};

export default SimpleChart;
