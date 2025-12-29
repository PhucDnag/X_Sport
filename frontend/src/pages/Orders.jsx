import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrderData = async () => {
    try {
      if (!token) {
        setLoading(false);
        return null;
      }

      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["createdAt"] = order.createdAt;
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error("Error loading orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  if (loading) {
    return (
      <div className="border-t pt-16 pb-16 px-4 sm:px-8 bg-white min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Đang tải đơn hàng...</p>
      </div>
    );
  }

  return (
    <div className="border-t pt-10 sm:pt-16 pb-16 px-4 sm:px-8 bg-white min-h-screen">
      <div className="text-xl sm:text-2xl mb-8 text-center">
        <Title text1={"Đơn hàng"} text2={"của tôi"} />
      </div>
  
      <div className="max-w-6xl mx-auto">
        {orderData.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">Bạn chưa có đơn hàng nào.</p>
            <button
              onClick={() => (window.location.href = "/")}
              className="mt-6 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
            >
              Tiếp tục mua sắm
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orderData.map((item, index) => (
              <div
                key={index}
                className="bg-white border rounded-xl p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center gap-4 shadow-sm hover:shadow-md transition"
              >
                {/* LEFT */}
                <div className="flex items-center gap-4 flex-1">
                  {/* --- KHU VỰC SỬA LỖI --- */}
                  <img
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border"
                    src={item.image && item.image.length > 0 ? item.image[0] : ''} 
                    alt={item.name}
                  />
                  {/* ----------------------- */}
  
                  <div className="flex flex-col gap-1">
                    <p className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-2">
                      {item.name}
                    </p>
  
                    <div className="flex flex-wrap gap-3 text-sm text-gray-700">
                      <span className="font-semibold text-[#e8002d]">
                        {item.price.toLocaleString("vi-VN")} {currency}
                      </span>
                      <span>Số lượng: {item.quantity}</span>
                      <span>Size: {item.size}</span>
                    </div>
  
                    <p className="text-xs sm:text-sm text-gray-500">
                      Ngày đặt:{" "}
                      {new Date(item.createdAt).toLocaleDateString("vi-VN")}
                    </p>
  
                    <p className="text-xs sm:text-sm text-gray-500">
                      Thanh toán: {item.paymentMethod}
                    </p>
                  </div>
                </div>
  
                {/* RIGHT - giữ nguyên */}
                <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${item.status === 'Đã hủy' ? 'bg-red-500' : 'bg-green-500'}`}></span>
                    <p className="text-sm sm:text-base font-medium text-gray-700">
                      {item.status}
                    </p>
                  </div>
  
                  <button
                    onClick={loadOrderData}
                    className="border border-gray-300 px-4 py-2 text-sm font-medium rounded-lg hover:bg-black hover:text-white hover:border-black transition"
                  >
                    Theo dõi đơn
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
  
};

export default Orders;
