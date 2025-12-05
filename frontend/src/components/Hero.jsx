import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'

const Hero = () => {
  const slides = [
    {
      image: assets.hero_img,
      badge: 'Sản phẩm bán chạy nhất',
      title: 'Hàng mới nhất',
      desc:
        'Khám phá bộ sưu tập vợt cầu lông mới nhất với thiết kế hiện đại, hiệu năng vượt trội và chất lượng được đảm bảo. Từng sản phẩm đều được chọn lọc kỹ lưỡng, phù hợp cho cả người chơi phong trào lẫn vận động viên chuyên nghiệp.',
      cta: { text: 'Mua sắm ngay', to: '/collection' },
    },
    {
      image: assets.bg_tuvan,
      badge: 'Hỗ trợ 24/7',
      title: 'Tư vấn miễn phí',
      desc:
        'Đội ngũ tư vấn luôn sẵn sàng hỗ trợ bạn chọn cây vợt phù hợp nhất.',
      cta: { text: 'Liên hệ ngay', to: '/contact' },
    },
    {
      image: assets.hero_khach_hang,
      badge: 'Cộng đồng yêu vợt',
      title: '3500+ khách hàng',
      desc:
        'Chất lượng tạo nên uy tín. Cảm ơn bạn đã tin tưởng và đồng hành cùng X-Sport.',
      cta: { text: 'Khám phá thêm', to: '/about' },
    },
  ]

  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 4500)
    return () => clearInterval(id)
  }, [paused, slides.length])

  const goTo = (idx) => setCurrent(idx)
  const next = () => setCurrent((p) => (p + 1) % slides.length)
  const prev = () => setCurrent((p) => (p - 1 + slides.length) % slides.length)

  return (
    <div
      className='relative w-full overflow-hidden rounded-2xl shadow-lg bg-gradient-to-br from-blue-50 via-white to-purple-50'
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides wrapper */}
      <div className='relative h-[500px] lg:h-[560px]'>
        {slides.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              i === current ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
            aria-hidden={i !== current}
          >
            {/* Subtle background layer */}
            {/* <div className='absolute inset-0 opacity-30'>
              <div className='absolute inset-0 bg-gradient-to-br from-blue-100/30 via-transparent to-purple-100/30'></div>
            </div> */}

            {/* Slide content */}
            <div className='relative z-10 h-full flex flex-col sm:flex-row items-center'>
              {/* Left text */}
              <div className='w-full sm:w-1/2 px-3 sm:px-9 lg:px-18 py-4 sm:py-6'>
                {/* Badge */}
                {/* <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 ring-1 ring-blue-500/20 text-xs sm:text-sm text-blue-700 mb-4 animate-[fadeIn_600ms_ease]'>
                  <span className='w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse'></span>
                  <span>{s.badge}</span>
                </div> */}

                {/* Title */}
                <h2 className='font-extrabold px-2 text-2xl sm:text-3xl lg:text-5xl leading-tight tracking-tight mb-4'>
                  <span className='bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent'>
                    {s.title}
                  </span>
                </h2>

                {/* Description */}
                <p className='text-gray-600 px-2 text-sm sm:text-base md:text-lg leading-relaxed mb-6 max-w-xl'>
                  {s.desc}
                </p>

                {/* CTA */}
                <NavLink
                  to={s.cta.to}
                  className='group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-3 text-sm sm:text-base font-semibold shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 hover:from-blue-700 hover:to-purple-700 transition-all'
                >
                  {s.cta.text}
                  <svg className='w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M7 5l6 5-6 5' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
                  </svg>
                </NavLink>
              </div>

              {/* Right image */}
              <div className='w-full sm:w-1/2 h-full flex items-center justify-center'>
                <img
                  src={s.image}
                  alt={s.title}
                  className='w-full h-60 md:w-full md:h-full object-contain p-4 sm:p-8 lg:p-12 transition-transform duration-700 will-change-transform'
                />
              </div>
            </div>

            {/* Overlay gradient for depth */}
            <div className='absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none'></div>
          </div>
        ))}

        {/* Controls */}
        <button
          type='button'
          aria-label='Slide trước'
          onClick={prev}
          className='hidden sm:block absolute left-2 sm:left-1 top-1/2 -translate-y-1/2 z-20 grid place-items-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/80 hover:bg-white shadow-md hover:shadow-lg backdrop-blur border border-white/60 transition'
        >
          <svg className='w-4 h-4 text-gray-700' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M12 5l-6 5 6 5' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
          </svg>
        </button>
        <button
          type='button'
          aria-label='Slide tiếp'
          onClick={next}
          className='hidden sm:block absolute right-1 sm:right-1 top-1/2 -translate-y-1/2 z-20 grid place-items-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/80 hover:bg-white shadow-md hover:shadow-lg backdrop-blur border border-white/60 transition'
        >
          <svg className='w-4 h-4 text-gray-700' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M8 5l6 5-6 5' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
          </svg>
        </button>

        {/* Dots */}
        <div className='absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2'>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Chuyển đến slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? 'w-6 bg-blue-600' : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Hero
