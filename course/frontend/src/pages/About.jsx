import React from 'react'
import { assets } from '../assets/assets'


const About = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p><span className='text-gray-700 font-medium'>HAKKIMIZDA</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>Hoş geldiniz Lorem ipsum dolor sit amet lorem ipsum dolor sit amet Lorem ipsum dolor sit amet</p>
          <p>Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet</p>
          <b className='text-gray-800'>Misyon ve Vizyon</b>
          <p>Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet</p>
        </div>
      </div>

      <div className='text-xl my-4'>
        <p>Neden <span className='text-gray-700 font-semibold'>Bizi Seçmelisiniz</span></p>
      </div>

      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>VERİMLİLİK</b>
          <p>Lorem ipsum dolor sit amet lorem ipsum dolor sit amet</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>ZAMAN TASARRUFU</b>
          <p>Lorem ipsum dolor sit amet lorem ipsum dolor sit amet</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>ÖZEL EĞİTİM</b>
          <p>Lorem ipsum dolor sit amet lorem ipsum dolor sit amet</p>
        </div>
      </div>

    </div>
  )
}

export default About