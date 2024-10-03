import React from 'react'

import { FaUserCircle } from "react-icons/fa";
import { IoIosDoneAll } from "react-icons/io";



const Chat = ({firstName, lastName, lastMessage}) => {
  console.log("lastMessage: ", lastMessage);
  return (
    <div className=' bg-blue-200 p-2 mb-1 rounded cursor-pointer '>
      <div className=' relative flex items-center'>
        <FaUserCircle className='text-5xl'/>

        <div className='ml-3'>
          <h2 className='font-bold'>{firstName} {lastName}</h2>
            <div className='flex items-center'>
              <p>{lastMessage.content}</p>
            </div>
        </div>

        <p className='absolute right-2 top-0 text-sm text-gray-500'>12:00</p>
      </div>
      
      
    </div>
  )
}

export default Chat