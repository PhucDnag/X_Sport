import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import { toast } from "react-toastify";

const Product = () => {
  const { productId } = useParams();
  // 3. Lấy thêm token từ Context
  const { products, currency, addToCart, token } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const navigate = useNavigate();

  const fetchProductData = async () => {
    if (products && products.length > 0) {
      const product = products.find((item) => item._id === productId);
      if (product) {
        setProductData(product);
        setImage(product.image[0]);
      }
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  const openModal = (imgSrc) => {
    setModalImage(imgSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage("");
  };

  // --- 5. Hàm xử lý logic Thêm vào giỏ hàng ---
  const handleAddToCart = () => {
    if (!token) {
      toast.warning("Vui lòng đăng nhập để mua hàng!");
      navigate("/login");
      return;
    }

    // Nếu đã đăng nhập thì gọi hàm gốc
    addToCart(productData._id, size);
  };

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 bg-white">
      {/* Product Data */}
      <div className="flex flex-col md:flex-row gap-10 sm:gap-12 p-6 min-h-screen">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse sm:flex-row gap-4">
          {/* Thumbnail list */}
          <div
            className="grid grid-cols-4 sm:flex sm:flex-col gap-3 overflow-hidden sm:w-[18%] w-full sm:max-h-[470px] p-1.5"
          >
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-full h-20 sm:w-full sm:h-auto object-cover rounded-lg border-2 border-gray-200 cursor-pointer hover:border-blue-500 hover:scale-105 transition-all duration-300 shadow-md"
                alt=""
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1">
            <img
              onClick={() => openModal(image)}
              className="w-full h-auto object-cover rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out"
              src={image}
              alt=""
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 px-3">
          <h1 className="font-bold text-3xl mt-2 text-gray-800">
            {productData.name}
          </h1>

          <div className="flex items-center gap-1 mt-4">
            <img src={assets.star_icon} alt="" className="w-5" />
            <img src={assets.star_icon} alt="" className="w-5" />
            <img src={assets.star_icon} alt="" className="w-5" />
            <img src={assets.star_icon} alt="" className="w-5" />
            <img src={assets.star_dull_icon} alt="" className="w-5" />
            <p className="pl-2 text-gray-600 text-sm">(46)</p>
          </div>

          <p className="mt-6 text-3xl font-bold text-[#e8002d]">
            {productData.price.toLocaleString("vi-VN")}
            {currency}
          </p>

          <p className="mt-6 text-gray-700 leading-relaxed text-base">
            {productData.description}
          </p>

          <div className="flex flex-col gap-4 my-8">
            <p className="font-semibold text-base">Chọn size</p>

            <div className="flex flex-wrap gap-3">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  key={index}
                  className={`border-2 py-2 px-4 rounded-lg bg-gray-100 transition-all duration-200 hover:bg-gray-200 hover:shadow-md ${
                    item === size
                      ? "border-orange-500 bg-orange-50 shadow-lg"
                      : ""
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-black text-white px-6 py-3 text-base rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            THÊM VÀO GIỎ HÀNG
          </button>

          <hr className="mt-10 sm:w-4/5 border-gray-300" />

          <div className="text-sm text-gray-600 mt-6 flex flex-col gap-2">
            <p>✅ Sản phẩm vợt cầu lông chính hãng 100%.</p>
            <p>✅ Hỗ trợ giao hàng toàn quốc, thanh toán khi nhận hàng.</p>
            <p>✅ Bảo hành chính hãng, đổi trả trong 7 ngày nếu lỗi từ NSX.</p>
            <p>✅ Tư vấn chọn vợt miễn phí.</p>
          </div>
        </div>

        {/* Full Screen Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-300">
            <div className="relative max-w-4xl max-h-full p-4">
              <img
                src={modalImage}
                alt=""
                className="w-full h-auto object-contain rounded-lg shadow-2xl"
              />
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white text-3xl font-bold bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center hover:bg-opacity-75 transition-all duration-200"
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Description & Reviews Section */}
      <div className="mt-8">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Mô tả</b>
          <p className="border px-5 py-3 text-sm">Đánh giá (25)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>{productData.description}</p>
        </div>
      </div>

      {/* display related products */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
