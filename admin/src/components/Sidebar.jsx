import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const menuItems = [
  { to: "/", label: "Dashboard", icon: assets.dashboard_icon },
  { to: "/add", label: "Thêm sản phẩm", icon: assets.add_icon },
  { to: "/list", label: "Danh sách sản phẩm", icon: assets.order_icon },
  { to: "/orders", label: "Danh sách đơn hàng", icon: assets.list_order_icon },
  { to: "/users", label: "Quản lý tài khoản", icon: assets.user_icon },
  { to: "/statistics", label: "Thống kê & Báo cáo", icon: assets.thongke_icon },
];

const Sidebar = () => {
  return (
    <div
      className="
        min-h-screen bg-white border-r border-r-gray-200 shadow-sm
        w-[70px] md:w-[260px]
        transition-all duration-300
      "
    >
      <div className="flex flex-col gap-2 pt-6 px-2 md:px-4 text-[15px]">
        {menuItems.map((item, index) => (
          <NavLink
            title={item.label}
            key={index}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3 rounded-lg transition-all
               ${
                 isActive
                   ? "bg-blue-100 text-blue-700 font-semibold"
                   : "text-gray-700 hover:bg-gray-100"
               }`
            }
          >
            {/* ICON */}
            <img
              className="w-6 h-6 object-contain mx-auto md:mx-0"
              src={item.icon}
              alt=""
            />

            <p className="hidden md:block whitespace-nowrap">{item.label}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
