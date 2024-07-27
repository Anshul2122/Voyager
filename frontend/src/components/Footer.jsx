import React from 'react'

const Footer = () => {
  return (
      <div className='bg-blue-500 py-10'>
          <div className='container mx-auto flex justify-between items-center '>
              <span className='text-3xl text-white font-bold tracking-tight flex flex-col'>
                  MernHoliday.com
                  <p className='text-sm'> © 2024 MernHoliday,Inc</p>
              </span>
              
              <span className='text-white font-bold tracking-tight flex gap-4'>
                  <p className='cursor-pointer hover:underline'>privacy policy</p>
                  <p className='cursor-pointer hover:underline'>Terms of service</p>
              </span>
          </div>
    </div>
  )
}

export default Footer