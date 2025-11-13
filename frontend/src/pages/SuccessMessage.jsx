import React from 'react';

const SuccessMessage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl bg-green-50 border border-green-200 rounded-lg p-4 sm:p-6 lg:p-8 text-center shadow-lg">
        <div className="mx-auto flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 lg:h-16 lg:w-16 rounded-full bg-green-100 mb-4">
          <span className="text-green-600 text-lg sm:text-2xl lg:text-3xl">✅</span>
        </div>
        
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-800 mb-2">
          Cảm ơn bạn!
        </h2>
        
        <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-6 leading-relaxed">
          Chúng tôi đã nhận được lời nhắn của bạn. Nhân viên sẽ liên hệ lại trong thời gian sớm nhất để hỗ trợ bạn.
        </p>
        
        <button 
          onClick={() => window.location.href = '/'}
          className="w-full sm:w-auto bg-green-600 text-white px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-lg hover:bg-green-700 transition-all duration-300 font-medium text-sm sm:text-base"
        >
          Quay về trang chủ
        </button>
        <p className="text-xs sm:text-sm text-gray-500 mt-4 animate-pulse">
          Chúng tôi đánh giá cao sự quan tâm của bạn đến [Tên thương hiệu].
        </p>
      </div>
    </div>
  );
};

export default SuccessMessage;
