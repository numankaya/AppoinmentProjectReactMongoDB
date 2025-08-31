import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        {/* ------------ Left Section ----------- */}
        <div>
          <img className='mb-5 w-40' src={assets.logo} alt="" />
          <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem ipsum dolor sit amet lore ipsum dolor sit amet</p>

        </div>

        {/* ------------ Center Section ----------- */}
        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>Anasayfa</li>
            <li>Hakkımızda</li>
            <li>İletişim</li>
            <li>Gizliliz Sözleşmesi</li>
          </ul>
        </div>

        {/* ------------ Right Section ----------- */}
        <div>
          <p className='text-xl font-medium mb-5'>İLETİŞİME GEÇ</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>0530 123 12 12</li>
            <li>example@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* ----------- Copyright Text ----------- */}
      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2024@ Company - Bütün Hakları Saklıdır.</p>
      </div>
    </div>
  )
}

export default Footer