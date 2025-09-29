import React, { useEffect, useRef, useState } from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'

// Mảng chứa dữ liệu khách hàng
    const customerReviews = [
      {
        name: 'Phan Tiến Cường',
        title: 'VĐV phong trào',
        review:
          'Giá cả hợp lý, chất lượng tốt, nhân viên nhiệt tình tư vấn. Tôi sẽ tiếp tục ủng hộ khi có nhu cầu mua sản phẩm tiếp theo.',
        avatar: assets.khach_hang_1,
      },
      {
        name: 'Trần Bảo',
        title: 'Thầy dạy cầu lông',
        review:
          'Đã từng mua vợt tại cửa hàng. Shop rất tận tình tư vấn sản phẩm, nhiều sản phẩm giá rẻ và sử dụng rất tốt!',
        avatar: assets.khach_hang_2,
      },
      {
        name: 'Phố Hiếu',
        title: 'Người chơi cầu lông',
        review:
          'Tôi từng qua trực tiếp cửa hàng để mua cây vợt Yonex mới, cảm thấy rất ưng ý đúng như yêu cầu, shop uy tín!',
        avatar: assets.khach_hang_3,
      },
      {
        name: 'Phương Thúy',
        title: 'VDV Phong Trào',
        review:
          'Sản phẩm chính hãng, đa dạng mẫu mã. Đặc biệt, đội ngũ kỹ thuật căng vợt rất chuyên nghiệp và chuẩn xác.',
        avatar: assets.khach_hang_4,
      },
      {
        name: 'Nguyễn Hoàng Nam',
        title: 'Huấn luyện viên',
        review:
          'Tôi thường xuyên mua vợt và phụ kiện cho học viên tại shop, chất lượng ổn định và dịch vụ sau bán hàng rất tốt.',
        avatar: assets.khach_hang_5,
      },
      {
        name: 'Lê Minh Anh',
        title: 'Sinh viên',
        review:
          'Shop có nhiều chương trình khuyến mãi hấp dẫn, sản phẩm phù hợp túi tiền sinh viên, nhân viên hỗ trợ tận tâm.',
        avatar: assets.khach_hang_6,
      },
    ]
    
    // Mảng chứa dữ liệu thống kê
    const statsData = [
      { number: '3500+', label: 'Khách hàng hài lòng với X-sport' },
      { number: '20+', label: 'Sản phẩm cầu lông đa dạng' },
      { number: '1000+', label: 'Khách quay trở lại mua hàng tại X-sport' },
    ]

const Evaluate = () => {

    const [visible, setVisible] = useState(false)
      const statsRef = useRef(null)
    
      useEffect(() => {
        const observer = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) {
              setVisible(true)
              observer.disconnect()
            }
          },
          { threshold: 0.2 }
        )
        if (statsRef.current) observer.observe(statsRef.current)
        return () => observer.disconnect()
      }, [])
    
      // ----------------------------------------------------
      // LOGIC SLIDER KHÁCH HÀNG
      // ----------------------------------------------------
      const [currentSlide, setCurrentSlide] = useState(0)
      const [autoPlay, setAutoPlay] = useState(true)
      const sliderRef = useRef(null)
    
      // Responsive: Số slides hiển thị (dựa trên screen size)
      const getSlidesToShow = () => {
        if (window.innerWidth < 640) return 1 // Mobile: 1 slide
        if (window.innerWidth < 1024) return 2 // Tablet: 2 slides
        return 3 // Desktop: 3 slides
      }
      const [slidesToShow, setSlidesToShow] = useState(getSlidesToShow())
    
      // Tính currentSlideIndex cho dots (dựa trên slidesToShow)
      const currentSlideIndex = Math.floor(currentSlide / slidesToShow)
    
      // Functions cho navigation
      const goToNext = () => {
        const maxSlide = customerReviews.length - slidesToShow
        // Slide tiếp theo (nếu chưa đến cuối) hoặc quay lại slide 0
        setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1))
      }
    
      const goToPrev = () => {
        const maxSlide = customerReviews.length - slidesToShow
        // Slide trước (nếu chưa ở đầu) hoặc chuyển đến slide cuối
        setCurrentSlide((prev) => (prev <= 0 ? maxSlide : prev - 1))
      }
    
      const goToSlide = (index) => {
        // Chuyển đến slide đầu tiên của nhóm đó
        setCurrentSlide(index * slidesToShow)
      }
    
      // Auto-play effect
      useEffect(() => {
        if (!autoPlay) return
        const interval = setInterval(() => {
          goToNext()
        }, 4000) // Slide mỗi 4s
    
        return () => clearInterval(interval)
      }, [autoPlay, slidesToShow])
    
      // Pause auto-play khi hover
      useEffect(() => {
        const handleMouseEnter = () => setAutoPlay(false)
        const handleMouseLeave = () => setAutoPlay(true)
    
        const slider = sliderRef.current
        if (slider) {
          slider.addEventListener('mouseenter', handleMouseEnter)
          slider.addEventListener('mouseleave', handleMouseLeave)
        }
    
        return () => {
          if (slider) {
            slider.removeEventListener('mouseenter', handleMouseEnter)
            slider.removeEventListener('mouseleave', handleMouseLeave)
          }
        }
      }, [])
    
      // Responsive resize
      useEffect(() => {
        const handleResize = () => {
          const newSlides = getSlidesToShow()
          if (newSlides !== slidesToShow) {
            setSlidesToShow(newSlides)
            setCurrentSlide(0) // Reset slide khi resize để tránh lỗi hiển thị
          }
        }
    
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
      }, [slidesToShow])
      // ----------------------------------------------------
      // KẾT THÚC LOGIC SLIDER KHÁCH HÀNG
      // 

    return (
        <>
            {/* KHỐI 1: KHÁCH HÀNG NÓI GÌ - ĐÃ CHUYỂN SANG SLIDER */}
            <div className="py-12 px-4 relative group">  {/* Thêm group để kiểm soát hover buttons */}
                {/* Title section */}
                <div className="text-xl pb-4 text-center">
                    <Title text1={'Khách hàng'} text2={'nói gì về X-sport'} checked={false} />
                </div>
                <p className="text-center text-gray-500 mb-10 max-w-2xl mx-auto">
                    Những lời bình thực tế của khách hàng đã tin tưởng và mua hàng tại X-sport.
                </p>

                {/* Slider container */}
                <div className="relative overflow-hidden rounded-xl bg-white shadow-lg max-w-7xl mx-auto">  {/* Thêm max-w-7xl mx-auto */}
                    {/* Inner track - Flex cho slides */}
                    <div
                        className="flex transition-transform duration-500 ease-in-out"  // Smooth transition
                        style={{ transform: `translateX(calc(-${currentSlide * 100}% / ${slidesToShow}))` }}  // Slide logic
                        ref={sliderRef}
                    >
                        {customerReviews.map((review, index) => (
                            <div
                                key={index}
                                // Điều chỉnh width cho responsive: 1/1 mobile, 1/2 tablet, 1/3 desktop. W-full là cần thiết vì flex-shrink-0
                                className={`flex-shrink-0 w-full ${slidesToShow >= 2 ? 'sm:w-1/2' : ''} ${slidesToShow >= 3 ? 'lg:w-1/3' : ''} px-4 py-6 text-center`}
                            >
                                {/* Review card */}
                                <div className="h-full flex flex-col justify-center items-center bg-gray-50 rounded-lg p-4 hover:bg-white hover:shadow-md transition-all duration-300 group">
                                    {/* Avatar */}
                                    <img
                                        className="w-16 h-16 md:w-20 md:h-20 mx-auto rounded-full object-cover shadow-lg mb-4 border-2 border-blue-500 group-hover:scale-110 group-hover:border-blue-600 transition-all duration-300"
                                        src={review.avatar}
                                        alt={review.name}
                                    />
                                    {/* Review text */}
                                    <p className="text-sm italic text-gray-700 mb-3 leading-relaxed max-w-full opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                                        "{review.review}"
                                    </p>
                                    {/* Name & Title */}
                                    <div className="space-y-1">
                                        <b className="text-gray-800 block text-base font-semibold">{review.name}</b>
                                        <span className="text-blue-600 text-xs font-medium uppercase tracking-wide">{review.title}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Prev/Next buttons - Ẩn trên mobile, hiện trên tablet/desktop, hiện khi hover */}
                    <button
                        onClick={goToPrev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-r-lg shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 md:opacity-50 md:group-hover:opacity-100 hidden sm:block"
                        aria-label="Previous slide"
                    >
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={goToNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-l-lg shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 md:opacity-50 md:group-hover:opacity-100 hidden sm:block"
                        aria-label="Next slide"
                    >
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Dots indicator - Dưới banner */}
                <div className="flex justify-center mt-8 space-x-2">
                    {Array.from({ length: Math.ceil(customerReviews.length / slidesToShow) }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 transform ${currentSlideIndex === index
                                ? 'bg-blue-500 scale-110 shadow-md'
                                : 'bg-gray-400 hover:bg-blue-400 hover:scale-125'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* KHỐI 2: NHỮNG CON SỐ ẤN TƯỢNG */}
            <div className="text-xl py-6">
                <Title text1={'NHỮNG CON SỐ'} text2={'ẤN TƯỢNG'} checked={false} />
            </div>

            <div
                ref={statsRef}
                className="flex flex-col md:flex-row mb-20"
            >
                {statsData.map((stat, index) => (
                    <div
                        key={index}
                        className={`flex-1 bg-blue-500 text-white p-8 md:p-12 text-center border-b md:border-b-0 md:border-r border-blue-400 last:border-r-0
              transition-all duration-700 ease-out transform
              ${visible
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-8'
                            }`}
                        style={{ transitionDelay: `${index * 200}ms` }}
                    >
                        <div className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-2">
                            {stat.number}
                        </div>
                        <div className="text-sm md:text-base font-medium uppercase tracking-wider">
                            {stat.label}
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Evaluate