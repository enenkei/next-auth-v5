'use client'

import Image from 'next/image'
import React from 'react'

const Error = () => {
  return (

    <>
      <div className='grid min-h-full bg-white px-56 py-10 sm:py-32 lg:px-72 dark:bg-gray-800 dark:text-white'>
        <div className="text-center">
          <div className='flex flex-col items-center justify-center space-y-4'>
            <Image src={'/status_imac_negative_icon_220296.svg'} width='300' height='300' alt='Error' />
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">Error😢</h1>
          <p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-200">Sorry, there's an error with this page</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a href="/" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Go back home</a>
            {/* <a href="#" className="text-sm font-semibold text-gray-900 dark:text-gray-200">Contact support <span aria-hidden="true">&rarr;</span></a> */}
          </div>
        </div>
      </div>

    </>
  )
}

export default Error
