import React from 'react'
import Button from '../components/Button'

const Home = () => {
  return (
    <div className='pageCenter'>
        <h1 className='text-3xl text-center font-bold mb-1'>A Real-time Chat Application</h1>
        <div className='flex'>
            <Button navigateTo="/login" text="Login" />
            <Button navigateTo="/signup" text="Signup" />
        </div>
    </div>
  )
}

export default Home
