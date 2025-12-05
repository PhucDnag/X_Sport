import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import { useForm, ValidationError } from "@formspree/react";
import SuccessMessage from "../pages/SuccessMessage";

const Contact = () => {
  const [state, handleSubmit] = useForm("xnngnrze");
  if (state.succeeded) {
    return <SuccessMessage />;
  }

  return (
    <div className="bg-white py-5">
      <div className="text-center text-2xl mt-6">
        <Title text1={"Liên hệ"} text2={"với chúng tôi"} />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 my-10 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <img
            className="w-full md:max-w-none rounded-xl shadow-md object-cover"
            src={assets.contact_img}
            alt="Liên hệ"
          />

          <div className="flex flex-col justify-center items-start gap-6">
            <p className="text-base sm:text-lg text-gray-700">
              Chúng tôi luôn sẵn sàng lắng nghe và giải đáp mọi thắc mắc của
              bạn.
            </p>

            <div className="space-y-2 text-gray-600 text-sm sm:text-base">
              <p className="flex items-start gap-2">
                <span>📍</span> <span>Địa chỉ: [Địa chỉ cửa hàng demo]</span>
              </p>
              <p className="flex items-start gap-2">
                <span>📞</span> <span>Số điện thoại: [Số điện thoại demo]</span>
              </p>
              <p className="flex items-start gap-2">
                <span>📱</span> <span>Hotline: [Hotline demo]</span>
              </p>
              <p className="flex items-start gap-2">
                <span>✉️</span> <span>Email: [Email demo]</span>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-2 w-full space-y-3">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email liên hệ của bạn
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="Nhập email của bạn..."
                  aria-invalid={!!state.errors?.email}
                />
                <ValidationError
                  prefix="Email"
                  field="email"
                  errors={state.errors}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-gray-700"
                >
                  Nội dung tin nhắn
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="Hãy để lại lời nhắn của bạn..."
                  aria-invalid={!!state.errors?.message}
                />
                <ValidationError
                  prefix="Message"
                  field="message"
                  errors={state.errors}
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-lg bg-black text-white px-4 sm:px-6 py-2.5 text-sm font-medium hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition"
                disabled={state.submitting}
              >
                {state.submitting ? "Đang gửi..." : "Gửi ngay"}
              </button>
            </form>
          </div>
        </div>

        <div className="w-full h-[550px] rounded-xl overflow-hidden mt-8">
          <div className="mb-3">
            <h3 className="text-xl font-semibold text-blue-600 py-2">
              Cơ sở chính của X-Sport Store
            </h3>

            <p className="text-gray-600 py-2">
              Chuyên cung cấp dụng cụ thể thao chính hãng, uy tín, giao hàng
              toàn quốc.
            </p>

            <div className="space-y-2 text-sm text-gray-700">
              <p>📍 298 Cầu Diễn, Bắc Từ Liêm, Hà Nội</p>
              <p>📞 0123 456 789</p>
              <p>⏰ 08:00 - 22:00 (T2 - CN)</p>
              <p>✉️ xsport@gmail.com</p>
            </div>
          </div>

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3131.048938874424!2d105.73325781290454!3d21.054055286515847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313455377a780795%3A0x52184cc9cccefc8c!2zS2hvYSBDTlRUIC0gxJBIIEPDtG5nIG5naGnhu4dwIEjDoCBO4buZaQ!5e0!3m2!1svi!2s!4v1764815799220!5m2!1svi!2s"
            width="100%"
            height="100%"
            style={{ border: "0" }}
            allowFullscreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      {/* <NewsletterBox /> */}
    </div>
  );
};

export default Contact;
