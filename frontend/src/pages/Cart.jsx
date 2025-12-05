import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  // useEffect(() => {
  //   if (products.length > 0) {
  //     const tempData = [];

  //     for (const items in cartItems) {
  //       for (const item in cartItems[items]) {
  //         if (cartItems[items][item] > 0) {
  //           tempData.push({
  //             _id: items,
  //             size: item,
  //             quantity: cartItems[items][item],
  //           });
  //         }
  //       }
  //     }
  //     setCartData(tempData);
  //   }
  // }, [cartItems]);

  useEffect(() => {
    // CHỈ CHẠY KHI CÓ DỮ LIỆU PRODUCTS
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]
            })
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]) // <-- Quan trọng: Phải theo dõi cả products

  return (
    <div className="border-t pt-14 pb-1 bg-white min-h-screen">
      <div className="text-2xl mb-6 text-center sm:text-left">
        <Title text1={"Giỏ hàng"} text2={"của bạn"} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {cartData.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              Giỏ hàng của bạn đang trống.
            </p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
            >
              Tiếp tục mua sắm
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {cartData.map((item, index) => {
              const productData = products.find(
                (product) => product._id === item._id
              );

              return (
                <div
                  key={index}
                  className="bg-white shadow-sm border rounded-lg p-4 grid grid-cols-1 sm:grid-cols-[2fr_1fr] items-center gap-4 hover:shadow-md transition-shadow"
                >
                  {/* Thông tin vợt */}
                  <div className="flex items-start gap-4">
                    <img
                      className="w-16 sm:w-20 h-16 sm:h-20 object-cover rounded"
                      src={productData?.image[0]}
                      alt={productData?.name}
                    />
                    <div className="flex-1">
                      <p className="text-sm sm:text-base font-medium text-gray-900">
                        {productData?.name}
                      </p>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2">
                        <p className="text-[#e8002d] font-semibold">
                          {productData?.price.toLocaleString("vi-VN")}{" "}
                          {currency}
                        </p>
                        <p className="px-2 ml-2 py-1 border bg-slate-50 rounded text-sm">
                          Size: {item.size}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between space-x-2">
                    {/*Số lượng sản phẩm */}
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-gray-600">Số lượng:</label>
                      <input
                        onChange={(e) =>
                          e.target.value === "" || e.target.value === "0"
                            ? null
                            : updateQuantity(
                                item._id,
                                item.size,
                                Number(e.target.value)
                              )
                        }
                        className="border rounded px-2 py-1 w-16 sm:w-20 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="number"
                        min={1}
                        defaultValue={item.quantity}
                      />
                    </div>

                    {/* Nút xóa */}
                    <div className="flex justify-end">
                      <img
                        onClick={() => updateQuantity(item._id, item.size, 0)}
                        className="w-5 h-5 cursor-pointer hover:opacity-75 transition"
                        src={assets.bin_icon}
                        alt="Xóa"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {cartData.length > 0 && (
          <div className="flex justify-center md:justify-end mt-12">
            <div className="w-full md:w-[450px] p-6 rounded-lg">
              <CartTotal />
              <div className="w-full text-center md:text-right mt-6">
                <button
                  onClick={() => navigate("/place-order")}
                  className="bg-black text-white text-sm px-8 py-3 rounded hover:bg-gray-800 transition"
                >
                  Thanh toán
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
