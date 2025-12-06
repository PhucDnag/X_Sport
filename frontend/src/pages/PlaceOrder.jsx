import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        // API calls for COD
        case "cod":
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );

          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;

        case "stripe":
          const responseStripe = await axios.post(
            backendUrl + "/api/order/stripe",
            orderData,
            { headers: { token } }
          );
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;

        case "vnpay":
          const responseVnpay = await axios.post(
            backendUrl + "/api/order/vnpay",
            orderData,
            { headers: { token } }
          );
          if (responseVnpay.data.success) {
            const { paymentUrl } = responseVnpay.data;
            window.location.replace(paymentUrl);
          } else {
            toast.error(responseVnpay.data.message);
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      // className="flex flex-col md:flex-row justify-between gap-4 pt-5 sm:pt-14 sm:pb-14 min-h[80vh] border-t bg-white px-8"
      className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 pt-5 sm:pt-14 sm:pb-14 min-h[80vh] border-t bg-white px-8"
    >
      {/* Left Side */}
      <div className="flex flex-col gap-4 w-full">
        <div className="text-xl sm:text-2xl my-3 mb-1">
          <Title text1={"Thông tin"} text2={"giao hàng"} />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Họ"
          />
          <input
            required
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Tên"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="email"
          placeholder="Email"
        />
        <input
          required
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Địa chỉ nhà"
        />
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Xã/Phường"
          />
          <input
            required
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Thành phố"
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="number"
            placeholder="Mã bưu chính"
          />
          <input
            required
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Quốc gia"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="number"
          placeholder=" Số điện thoại"
        />
      </div>

      {/* Right Side */}
      <div className="mt-8">
        <div className="mt-8">
          <CartTotal />
        </div>

        <div className="mt-12">
          <div className="text-base lg:text-xl font-bold text-blue-600 uppercase text-center my-3">
            <h2>Phương thức thanh toán</h2>
          </div>
          {/* Payment Methods */}
          <div className="flex flex-col gap-3">
  {/* Phương thức thanh toán Stripe */}
  <div
    onClick={() => setMethod("stripe")}
    className={`flex items-center gap-4 border-2 p-1.5 px-6 cursor-pointer rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105
      ${
        method === "stripe"
          ? "border-green-500 bg-gradient-to-r from-green-50 to-green-100 shadow-lg ring-2 ring-green-200"
          : "border-gray-200 hover:border-green-400 hover:bg-gradient-to-r from-gray-50 to-green-50 hover:shadow-md"
      }
    `}
  >
    <div
      className={`w-4 h-4 border-2 rounded-full flex items-center justify-center transition-all duration-300 ${
        method === "stripe" ? "bg-green-500 border-green-500" : "border-gray-400"
      }`}
    >
      {method === "stripe" && <div className="w-2 h-2 bg-white rounded-full"></div>}
    </div>
    <img className="h-6" src={assets.stripe_logo} alt="Stripe Logo" />
  </div>

  {/* Phương thức thanh toán VNPAY*/}
  <div
    onClick={() => setMethod("vnpay")}
    className={`flex items-center gap-4 border-2 p-1.5 px-6 cursor-pointer rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105
      ${
        method === "vnpay"
          ? "border-blue-500 bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg ring-2 ring-blue-200"
          : "border-gray-200 hover:border-blue-400 hover:bg-gradient-to-r from-gray-50 to-blue-50 hover:shadow-md"
      }
    `}
  >
    <div
      className={`w-4 h-4 border-2 rounded-full flex items-center justify-center transition-all duration-300 ${
        method === "vnpay" ? "bg-blue-500 border-blue-500" : "border-gray-400"
      }`}
    >
      {method === "vnpay" && <div className="w-2 h-2 bg-white rounded-full"></div>}
    </div>
    <div className="flex items-center gap-2">
      <span className="text-red-500 text-base font-semibold">VN<span className="text-blue-500">PAY</span></span>
    </div>
  </div>

  {/* Phương thức thanh toán khi nhận hàng */}
  <div
    onClick={() => setMethod("cod")}
    className={`flex items-center gap-4 border-2 p-1.5 px-6 cursor-pointer rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105
      ${
        method === "cod"
          ? "border-orange-500 bg-gradient-to-r from-orange-50 to-orange-100 shadow-lg ring-2 ring-orange-200"
          : "border-gray-200 hover:border-orange-400 hover:bg-gradient-to-r from-gray-50 to-orange-50 hover:shadow-md"
      }
    `}
  >
    <div
      className={`w-4 h-4 border-2 rounded-full flex items-center justify-center transition-all duration-300 ${
        method === "cod" ? "bg-orange-500 border-orange-500" : "border-gray-400"
      }`}
    >
      {method === "cod" && <div className="w-2 h-2 bg-white rounded-full"></div>}
    </div>
    <div className="flex items-center gap-2">
      <span className="text-gray-700 text-base font-semibold">Thanh toán khi nhận hàng</span>
    </div>
  </div>
</div>


          <div className="w-full sm:text-end text-center my-8">
            <button
              type="submit"
              className="bg-black text-white px-8 py-2 tetx-sm font-semibold rounded-md"
            >
              ĐẶT HÀNG
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
