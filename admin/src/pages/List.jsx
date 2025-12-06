import axios from "axios";
import React, { useState, useEffect } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import ConfirmModal from "../components/ConfirmModal";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // State cho Delete Modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // State cho Edit Modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // --- STATE DỮ LIỆU FORM SỬA ---
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState(""); // Mới thêm
  const [editCategory, setEditCategory] = useState("Yonex");
  const [editSubCategory, setEditSubCategory] = useState("Attack"); // Mới thêm
  const [editPrice, setEditPrice] = useState("");
  const [editSizes, setEditSizes] = useState([]); // Mới thêm
  const [editBestseller, setEditBestseller] = useState(false); // Mới thêm

  // State cho 4 ảnh (lưu file mới)
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  // State lưu URL ảnh cũ để hiển thị
  const [oldImages, setOldImages] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        const sortedProducts = response.data.products.sort(
          (a, b) =>
            new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date)
        );
        setList(sortedProducts);
        setFilteredList(sortedProducts);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
        setShowDeleteModal(false);
        setProductToDelete(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (productToDelete) {
      removeProduct(productToDelete._id);
    }
  };

  // --- LOGIC MỞ MODAL SỬA ---
  const handleEditClick = (product) => {
    setEditingProduct(product);

    // Đổ dữ liệu cũ vào form
    setEditName(product.name);
    setEditDescription(product.description);
    setEditCategory(product.category);
    setEditSubCategory(product.subCategory);
    setEditPrice(product.price);
    setEditSizes(product.sizes || []);
    setEditBestseller(product.bestseller);
    setOldImages(product.image || []);

    // Reset các file ảnh mới về false
    setImage1(false);
    setImage2(false);
    setImage3(false);
    setImage4(false);

    setShowEditModal(true);
  };

  // --- LOGIC XỬ LÝ CHECKBOX SIZE ---
  const toggleSize = (size) => {
    setEditSizes((prev) =>
      prev.includes(size)
        ? prev.filter((item) => item !== size)
        : [...prev, size]
    );
  };

  // --- LOGIC GỬI API CẬP NHẬT ---
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("id", editingProduct._id);
      formData.append("name", editName);
      formData.append("description", editDescription);
      formData.append("price", editPrice);
      formData.append("category", editCategory);
      formData.append("subCategory", editSubCategory);
      formData.append("bestseller", editBestseller);
      formData.append("sizes", JSON.stringify(editSizes));

      // Chỉ gửi ảnh nào người dùng chọn mới
      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/update",
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("Cập nhật sản phẩm thành công!");
        setShowEditModal(false);
        setEditingProduct(null);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Search & Pagination Logic
  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
    setCurrentPage(1);
    if (searchValue.trim() === "") {
      setFilteredList(list);
    } else {
      const filtered = list.filter(
        (item) =>
          item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.category.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredList(filtered);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredList.length / itemsPerPage);

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Danh sách tất cả sản phẩm
      </p>

      {/* Search Bar */}
      <div className="mb-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm theo tên hoặc hãng..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <div className="text-sm text-gray-600">
          Danh sách có {filteredList.length} sản phẩm
        </div>
      </div>

      {/* Table */}
      <div className="flex flex-col gap-2">
        <div className="hidden xl:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center text-center border border-gray-300 py-1 px-2 bg-gray-100 text-sm">
          <b>Hình ảnh</b>
          <b>Tên</b>
          <b>Hãng</b>
          <b>Giá</b>
          <b className="text-center">Thao tác</b>
        </div>

        {currentItems.length > 0 ? (
          currentItems.map((item, index) => (
            <div
              className="grid grid-cols-[1fr_3fr_1fr] xl:grid-cols-[1fr_3fr_1fr_1fr_1fr] text-center items-center border border-gray-300 text-sm gap-2 py-1 px-2 hover:bg-gray-100 transition ease-in-out"
              key={index}
            >
              <img
                className="w-20 object-cover h-20 mx-auto"
                src={item.image[0]}
                alt=""
              />
              <p className="text-orange-600 font-medium">{item.name}</p>
              <p className="text-blue-600">{item.category}</p>
              <p className="text-red-600 font-bold text-sm">
                {item.price.toLocaleString("vi-VN")}
                {currency}
              </p>

              <div className="flex justify-center gap-2 items-center">
                <button
                  onClick={() => handleEditClick(item)}
                  className="p-2 rounded-full hover:bg-blue-100 transition text-blue-500"
                  title="Chỉnh sửa"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </button>

                <button
                  onClick={() => handleDeleteClick(item)}
                  className="p-2 rounded-full hover:bg-red-100 transition text-red-500"
                  title="Xóa"
                >
                  <img
                    className="w-5 h-5"
                    src={assets.delete_icon}
                    alt="Delete"
                  />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            {searchTerm
              ? "Không tìm thấy sản phẩm nào"
              : "Chưa có sản phẩm nào"}
          </div>
        )}
      </div>

      {/* Pagination (Giữ nguyên) */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
          <div className="text-sm text-gray-600">
            Hiển thị {indexOfFirstItem + 1} -{" "}
            {Math.min(indexOfLastItem, filteredList.length)} trên{" "}
            {filteredList.length} sản phẩm
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Trước
            </button>
            <span className="px-3 py-1 bg-gray-100 rounded text-sm">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Tiếp
            </button>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        title="Xác nhận xóa sản phẩm"
        message={`Bạn có chắc chắn muốn xóa sản phẩm "${productToDelete?.name}" không?`}
        confirmText="Xóa"
        cancelText="Hủy"
      />

      {/* --- MODAL CHỈNH SỬA SẢN PHẨM --- */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-all duration-300">
          <div className="bg-white rounded-lg w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header Modal */}
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50 shrink-0">
              <h3 className="text-lg font-semibold text-gray-800">
                Cập nhật sản phẩm
              </h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Body Modal */}
            <form
              onSubmit={handleUpdateProduct}
              className="p-6 overflow-y-auto"
            >
              <div className="space-y-4">
                {/* 1. Khu vực Upload Ảnh */}
                <div>
                  <p className="mb-2 font-medium text-gray-700">
                    Hình ảnh sản phẩm
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {[image1, image2, image3, image4].map((img, index) => (
                      <label
                        key={index}
                        htmlFor={`edit-image${index + 1}`}
                        className="relative group cursor-pointer"
                      >
                        <img
                          className="w-20 h-20 object-cover border rounded group-hover:opacity-75 transition"
                          src={
                            img
                              ? URL.createObjectURL(img)
                              : oldImages[index]
                              ? oldImages[index]
                              : assets.upload_area
                          }
                          alt=""
                        />
                        <input
                          onChange={(e) => {
                            if (index === 0) setImage1(e.target.files[0]);
                            if (index === 1) setImage2(e.target.files[0]);
                            if (index === 2) setImage3(e.target.files[0]);
                            if (index === 3) setImage4(e.target.files[0]);
                          }}
                          type="file"
                          id={`edit-image${index + 1}`}
                          hidden
                        />
                      </label>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    *Nhấn vào ảnh để thay đổi từng ảnh riêng lẻ.
                  </p>
                </div>

                {/* Tên sản phẩm & Giá */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tên sản phẩm
                    </label>
                    <input
                      type="text"
                      required
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Giá tiền
                    </label>
                    <input
                      type="number"
                      required
                      value={editPrice}
                      onChange={(e) => setEditPrice(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Mô tả */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mô tả sản phẩm
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập mô tả chi tiết..."
                  />
                </div>

                {/* Danh mục & Phong cách chơi */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Thương hiệu
                    </label>
                    <select
                      onChange={(e) => setEditCategory(e.target.value)}
                      value={editCategory}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="Yonex">Yonex</option>
                      <option value="Victor">Victor</option>
                      <option value="Lining">Lining</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phong cách chơi
                    </label>
                    <select
                      onChange={(e) => setEditSubCategory(e.target.value)}
                      value={editSubCategory}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="Attack">Tấn công</option>
                      <option value="Defense">Phòng thủ, phản tạt</option>
                      <option value="Balance">Công thủ toàn diện</option>
                    </select>
                  </div>
                </div>

                {/* Trọng lượng (Sizes) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trọng lượng sản phẩm
                  </label>
                  <div className="flex gap-3">
                    {["3U", "4U", "5U"].map((size) => (
                      <div
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={`${
                          editSizes.includes(size)
                            ? "bg-orange-200 border-orange-300 text-orange-800"
                            : "bg-slate-100 border-slate-200 text-slate-600"
                        } 
                            border px-4 py-2 rounded cursor-pointer transition select-none font-medium`}
                      >
                        {size}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bestseller Checkbox */}
                <div className="flex items-center gap-2 mt-2 p-3 bg-gray-50 rounded border border-gray-200">
                  <input
                    type="checkbox"
                    id="edit-bestseller"
                    className="w-4 h-4 text-blue-600"
                    checked={editBestseller}
                    onChange={() => setEditBestseller((prev) => !prev)}
                  />
                  <label
                    htmlFor="edit-bestseller"
                    className="cursor-pointer text-sm font-medium text-gray-700"
                  >
                    Thêm vào danh sách bán chạy nhất
                  </label>
                </div>
              </div>

              {/* Footer Modal */}
              <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm"
                >
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default List;
