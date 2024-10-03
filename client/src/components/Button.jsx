import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({text, navigateTo}) => {
  return (
    <Link to={navigateTo}> 
        <button className='p-1 px-3 rounded mr-1 shadow-lg bg-blue-300 hover:bg-blue-500 hover:text-white'>{text}</button>
    </Link>
  )
}

export default Button
