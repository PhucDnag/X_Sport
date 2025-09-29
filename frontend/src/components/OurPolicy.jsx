// import React from 'react'
// import { assets } from '../assets/assets'

// const OurPolicy = () => {
//   return (
//     <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>

//       <div >
//         <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt="" />
//         <p className='font-semibold'>Chính sách đổi trả dễ dàng</p>
//         <p className='text-gray-400'>Chúng tôi cung cấp chính sách đổi trả dễ dàng</p>
//       </div>
//       <div >
//         <img src={assets.quality_icon} className='w-12 m-auto mb-5' alt="" />
//         <p className='font-semibold'>Chính sách đổi trả trong vòng 7 ngày</p>
//         <p className='text-gray-400'>Chúng tôi cung cấp chính sách trả hàng miễn phí trong 7 ngày</p>
//       </div>
//       <div >
//         <img src={assets.support_img} className='w-12 m-auto mb-5' alt="" />
//         <p className='font-semibold'>Hỗ trợ khách hàng tốt nhất</p>
//         <p className='text-gray-400'>Chúng tôi cung cấp hỗ trợ khách hàng 24/7</p>
//       </div>
      
//     </div>
//   )
// }

// export default OurPolicy

// src/components/OurPolicy.jsx

// src/components/OurPolicy.jsx
import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='bg-gray-50 py-16 px-4 sm:px-6 lg:px-8'>
      {/* Container giới hạn width cho desktop */}
      <div className='max-w-6xl mx-auto'>
        <div className='flex flex-col sm:flex-row justify-around gap-8 sm:gap-4 text-center'>
          {/* Card 1 */}
          <div className='flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out group animate-fadeIn animation-delay-100'>
            {/* Icon với hover scale và grayscale filter */}
            <img 
              src={assets.exchange_icon} 
              className='w-12 mx-auto mb-5 group-hover:scale-110 transition-transform duration-300 [filter:grayscale(100%)] group-hover:[filter:grayscale(0)]'
              alt="Chính sách đổi trả"
              aria-label="Icon đổi trả"
            />
            {/* Tiêu đề với hover color change */}
            <p className='text-lg sm:text-xl font-bold text-black-600 mb-2 group-hover:text-blue-700 transition-colors duration-300'>
              Chính sách đổi trả dễ dàng
            </p>
            <p className='text-gray-500 text-sm sm:text-base leading-relaxed'>
              Chúng tôi cung cấp chính sách đổi trả dễ dàng
            </p>
          </div>

          {/* Card 2 */}
          <div className='flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out group animate-fadeIn animation-delay-200'>
            {/* Icon với hover scale và grayscale filter */}
            <img 
              src={assets.quality_icon} 
              className='w-12 mx-auto mb-5 group-hover:scale-110 transition-transform duration-300 [filter:grayscale(100%)] group-hover:[filter:grayscale(0)]'
              alt="Chính sách chất lượng"
              aria-label="Icon chất lượng"
            />
            {/* Tiêu đề với hover color change */}
            <p className='text-lg sm:text-xl font-bold text-black-600 mb-2 group-hover:text-blue-700 transition-colors duration-300'>
              Chính sách đổi trả trong vòng 7 ngày
            </p>
            <p className='text-gray-500 text-sm sm:text-base leading-relaxed'>
              Chúng tôi cung cấp chính sách trả hàng miễn phí trong 7 ngày
            </p>
          </div>

          {/* Card 3 */}
          <div className='flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out group animate-fadeIn animation-delay-300'>
            {/* Icon với hover scale và grayscale filter */}
            <img 
              src={assets.support_img} 
              className='w-12 mx-auto mb-5 group-hover:scale-110 transition-transform duration-300 [filter:grayscale(100%)] group-hover:[filter:grayscale(0)]'
              alt="Hỗ trợ khách hàng"
              aria-label="Icon hỗ trợ"
            />
            {/* Tiêu đề với hover color change */}
            <p className='text-lg sm:text-xl font-bold text-black-600 mb-2 group-hover:text-blue-700 transition-colors duration-300'>
              Hỗ trợ khách hàng tốt nhất
            </p>
            <p className='text-gray-500 text-sm sm:text-base leading-relaxed'>
              Chúng tôi cung cấp hỗ trợ khách hàng 24/7
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OurPolicy
