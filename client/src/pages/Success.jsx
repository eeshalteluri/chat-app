import React from 'react'
import { useNavigate } from 'react-router-dom'

const Success = () => {
    const navigate = useNavigate()

  return (
    <div className='pageCenter'>
        <div className='bg-blue-200 border-6 border-none rounded p-8 m-12'>
        <h1 className='text-3xl font-bold'>Account successfully created!!</h1>
        <p className='text-2xl text-center'>Please <button className='underline hover:text-blue-500' onClick={() => navigate('/login')}>Login</button> here</p>
        </div>
    </div>
  )
}

export default Success