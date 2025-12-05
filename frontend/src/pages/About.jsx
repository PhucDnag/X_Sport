import React, { useEffect, useRef, useState } from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="bg-white py-5">
      <div className="text-2xl text-center mt-6">
        <Title text1={"Giới thiệu"} text2={"về chúng tôi"} checked={true} />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 my-10 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <img
            className="w-full md:max-w-none rounded-xl shadow-md object-cover"
            src={assets.about_img}
            alt=""
          />
          <div className="flex flex-col justify-center gap-6 text-gray-600">
            <p>
              X-sport là thương hiệu trẻ ra đời từ năm 2024, chuyên cung cấp các
              dòng vợt cầu lông chất lượng cao, phục vụ nhu cầu luyện tập và thi
              đấu của người chơi ở mọi trình độ – từ phong trào đến chuyên
              nghiệp. Với định hướng “Chất lượng tạo nên khác biệt”, X-sport
              không chỉ là nơi bán sản phẩm, mà còn là người đồng hành đáng tin
              cậy của cộng đồng cầu lông tại Việt Nam.
            </p>
            <b className="text-gray-800 text-[18px]">Sứ mệnh</b>
            <p>
              X-sport cam kết mang đến cho khách hàng những sản phẩm chính hãng
              – đa dạng – phù hợp với thể trạng người Việt, đồng thời tư vấn
              đúng – trúng – tận tâm để giúp người chơi chọn được cây vợt phù
              hợp với phong cách và trình độ của mình.
            </p>
            <b className="text-gray-800 text-[18px]">Tầm nhìn</b>
            <p>
              X-sport hướng đến việc trở thành địa chỉ bán vợt cầu lông đáng tin
              cậy hàng đầu tại Việt Nam, với hệ thống phân phối hiện đại và dịch
              vụ khách hàng chuyên nghiệp, góp phần lan tỏa niềm đam mê và phát
              triển phong trào cầu lông nước nhà.
            </p>
          </div>
        </div>
      </div>

      {/* ... phần card icon giữ nguyên ... */}

      <div className="text-xl py-2">
        <Title text1={"HÃY MUA HÀNG"} text2={"CỦA CHÚNG TÔI"} checked={false} />
      </div>

      <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mb-10">
        {" "}
         {/* Container với nền nhẹ, padding responsive */}
        <div className="max-w-5xl mx-auto">
          {" "}
           {/* Giới hạn width cho desktop */}
          <div className="flex flex-col md:flex-row gap-6 text-center">
            {" "}
             {/* Thêm text-center luôn (căn giữa text toàn bộ) */}
            {/* Card 1 - Thêm items-center cho align đẹp */}
            <div className="flex-1 bg-white rounded-lg border border-gray-200 p-6 md:p-8 lg:p-12 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out group opacity-100 flex flex-col items-center">
              {" "}
               {/* Thêm flex flex-col items-center */}
              {/* Icon wrapper: Đã center */}
              <div className="flex justify-center mb-4">
                <svg
                  className="w-8 h-8 md:w-10 md:h-10 text-blue-600 group-hover:text-blue-700 group-hover:scale-110 transition-all duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 10-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-blue-600 mb-3 group-hover:text-blue-700 transition-colors duration-300 leading-tight text-center max-w-xs">
                {" "}
                 {/* Thêm text-center + max-w-xs để text không quá rộng */}
                Chất lượng chính hãng, nguồn gốc rõ ràng
              </h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed text-center max-w-md">
                {" "}
                 {/* Thêm text-center + max-w-md cho wrap đẹp */}
                Tất cả sản phẩm đều được nhập khẩu hoặc phân phối chính thức,
                nói không với hàng giả, hàng nhái.
              </p>
            </div>
            {/* Card 2*/}
            <div className="flex-1 bg-white rounded-lg border border-gray-200 p-6 md:p-8 lg:p-12 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out group opacity-100 flex flex-col items-center">
              <div className="flex justify-center mb-4">
                <svg
                  className="w-8 h-8 md:w-10 md:h-10 text-blue-600 group-hover:text-blue-700 group-hover:scale-110 transition-all duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />{" "}
                   {/* Headset */}
                </svg>
              </div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-blue-600 mb-3 group-hover:text-blue-700 transition-colors duration-300 leading-tight text-center max-w-xs">
                Tư vấn chuẩn theo trình độ người chơi
              </h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed text-center max-w-md">
                Đội ngũ am hiểu kỹ thuật, sẵn sàng tư vấn chọn vợt phù hợp với
                lối đánh, sức tay và kinh nghiệm.
              </p>
            </div>
            {/* Card 3*/}
            <div className="flex-1 bg-white rounded-lg border border-gray-200 p-6 md:p-8 lg:p-12 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out group opacity-100 flex flex-col items-center">
              <div className="flex justify-center mb-4">
                <svg
                  className="w-8 h-8 md:w-10 md:h-10 text-blue-600 group-hover:text-blue-700 group-hover:scale-110 transition-all duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />{" "}
                   {/* Shield with check */}
                </svg>
              </div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-blue-600 mb-3 group-hover:text-blue-700 transition-colors duration-300 leading-tight text-center max-w-xs">
                Dịch vụ hậu mãi uy tín – căng vợt, bảo hành tận tâm
              </h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed text-center max-w-md">
                Miễn phí căng vợt lần đầu, hỗ trợ bảo hành chính hãng và đổi trả
                theo quy định rõ ràng.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default About;
