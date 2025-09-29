// components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Footer";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";

const Layout = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] min-h-screen">
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <Outlet /> {/* Đây là nơi render các trang con */}
      <Footer />
    </div>
  );
};

export default Layout;
