import React from 'react'
import Navbar from './_components/navbar'

type Props = {
    children : React.ReactNode
}

const SettingsLayout = ({children} : Props) => {
  return (
    <div className='h-full w-full flex flex-col gap-y-10 items-center justify-center bg-zinc-200'>
      <Navbar />
      {children}
    </div>
  )
}

export default SettingsLayout;
