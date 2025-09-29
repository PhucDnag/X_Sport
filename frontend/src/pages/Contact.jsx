import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'
import { useForm, ValidationError } from '@formspree/react';
import SuccessMessage from '../pages/SuccessMessage';

const Contact = () => {

  const [state, handleSubmit] = useForm("xnngnrze");
  if (state.succeeded) {
      return <SuccessMessage />;
  }

  return (
    <div className='bg-white py-5'>

      <div className='text-center text-2xl pt-10 border-t'>
          <Title text1={'Liên hệ'} text2={'với chúng tôi'}/>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-8 mb-28'>
        <img className='w-full md:max-w-[480px] rounded' src={assets.contact_img} alt="Contact" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>
            Chúng tôi luôn sẵn sàng lắng nghe và giải đáp mọi thắc mắc của bạn.
          </p>

          <div className='text-gray-500'>
            <p>📍 Địa chỉ: [Địa chỉ cửa hàng demo]</p>
            <p>📞 Số điện thoại: [Số điện thoại demo]</p>
            <p>📱 Hotline: [Hotline demo]</p>
            <p>✉️ Email: [Email demo]</p>
          </div>

          <form onSubmit={handleSubmit} className='flex flex-col gap-2 w-[100%]'>
            <label htmlFor="email" className='font-medium text-gray-600'>
              Email liên hệ của bạn
            </label>
            <input
              id="email"
              type="email" 
              name="email"
              className='border p-2 rounded'
              placeholder='Nhập email của bạn...'
            />
            <ValidationError 
              prefix="Email" 
              field="email"
              errors={state.errors}
            />

            <label htmlFor="message" className='font-medium text-gray-600'>
              Nội dung tin nhắn
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              className='border p-2 rounded'
              placeholder='Hãy để lại lời nhắn của bạn...'
            />
            <ValidationError 
              prefix="Message" 
              field="message"
              errors={state.errors}
            />

            <button 
              type="submit" 
              className='border rounded border-black px-8 py-2 text-sm hover:bg-black hover:text-white transition-all duration-300' 
              disabled={state.submitting}
            >
              Gửi ngay
            </button>
          </form>
        </div>
      </div>
  
      {/* <NewsletterBox /> */}
    
    </div>
  )
}

export default Contact
