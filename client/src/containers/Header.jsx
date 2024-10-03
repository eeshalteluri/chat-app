import React from 'react'

import { IoMdMore } from "react-icons/io";

const Header = () => {
  return (
    <>
        <div className='mt-3  flex justify-between'>
        <p className='text-2xl font-bold  w-fit'>verp</p>
        <IoMdMore className=' text-3xl cursor-pointer'/>
        </div>
    </>
  )
}

export default Header