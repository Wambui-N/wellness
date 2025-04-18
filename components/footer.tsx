import React from 'react'
import Image from 'next/image'

const footer = () => {
  return (
    <footer className='bg-[#020c12] p-6 mt-6'>
        <div className='responsive flex flex-col items-center justify-between'>
            <div className='flex flex-col items-center space-y-4'>
              <div className="flex items-center gap-2">
                <Image 
                  src="/WD White Logo.png" 
                  alt="The Wellness Notebook Logo" 
                  width={32} 
                  height={32}
                  className="h-8 w-8"
                />
                <h1 className='text-white text-2xl'>The Wellness Notebook</h1>
              </div>
              <p className='text-white text-sm'>© 2025 The Wellness Notebook. All rights reserved.</p>
            </div>
            <div className='flex space-x-4'>
              <a href='#' className='text-white text-sm'>Privacy Policy</a>
              <a href='#' className='text-white text-sm'>Terms of Service</a>
            </div>
        </div>
    </footer>
  )
}

export default footer