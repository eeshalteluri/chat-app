import React from 'react'
import { useState } from 'react'
import axios from 'axios'

import { HiUserAdd } from "react-icons/hi";
import { HiUserRemove } from "react-icons/hi";
import { set } from 'mongoose';


const RequestFriend = ({firstName, lastName, username, isRequestSent, isButtonDisabled}) => {

    const [isRequestSentState, setIsRequestSentState] = useState(isRequestSent)
    console.log("isButtonDisabled: ", isButtonDisabled)
    console.log("isRequestSentState: ", isRequestSentState)
    const requestFriendHandler = async() => {
        const handlingRequestState  = !isRequestSentState
        setIsRequestSentState(!isRequestSentState)

        if(handlingRequestState){
            const res = await axios.post(`http://localhost:3000/api/v1/friends/sendfriendrequest`,
                {
                    friend: username
                },
                {
                    withCredentials: true
                }
            )
        }else{
            const res = await axios.put(`http://localhost:3000/api/v1/friends/removesentfriendrequest`,
                {
                    friend: username
                },
                {
                    withCredentials: true
                }
            )
        }
        
    }

  return (
    <>
        <div className='w-full mt-2 py-2 px-6 bg-blue-200 rounded flex justify-between items-center'>
            <div>
                <h3 className='font-bold text-lg'>{firstName} {lastName}</h3>
                <p className='italic'>@{username}</p>
            </div>
            
            { isRequestSentState && !isButtonDisabled ? (<HiUserRemove className='text-4xl cursor-pointer rounded-full p-2 bg-red-300' onClick={requestFriendHandler}/>) :  (<HiUserAdd className={`text-4xl rounded-full p-2 ${isButtonDisabled ? 'cursor-not-allowed bg-gray-300' : 'cursor-pointer bg-green-300'}`} onClick={isButtonDisabled ? null : requestFriendHandler} />) }

        </div>
    </>
  )
}


export default RequestFriend