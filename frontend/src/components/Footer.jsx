import React from 'react'

const Footer = () => {
  return (
      <div className='bg-blue-500 py-10'>
          <div className='container mx-auto flex justify-between items-center'>
              <span className='text-3xl text-white font-bold tracking-tight'>
                  MernHoliday.com
              </span>
              <span className='text-white font-bold tracking-tight flex gap-4'>
                  <p> © 2024 MernHoliday,Inc</p>
                  <p className='cursor-pointer hover:underline'>privacy policy</p>
                  <p className='cursor-pointer hover:underline'>Terms of service</p>
              </span>
          </div>
    </div>
  )
}

export default Footer