import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { fetchUsers } from '../redux/fetchUsers'; // Make sure to use this if needed
import getUser from '../methods/getUser'; // Ensure this is the correct import

import { IoMdCheckmark } from "react-icons/io";
import { IoMdClose } from "react-icons/io";



const RequestNotification = () => {
  const [user, setUser] = useState(null); // State to store user data
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [requestAction, setRequestAction] = useState(false);// New state to trigger re-render

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUser(); // Fetch the user data
      setUser(userData); // Set the user data in state
      setLoading(false); // Set loading to false once data is fetched
    };

    fetchUserData(); // Call the function to fetch user data
  }, [requestAction]); // Empty dependency array to run only on mount

  const removeSentRequest = async (username) => {
    const res = await axios.put(`http://localhost:3000/api/v1/friends/removesentfriendrequest`,
      {
          friend: username
      },
      {
          withCredentials: true
      }
  )
  setRequestAction(prev => !prev); // Trigger re-render

  }

  const removeReceivedRequest = async (username) => {
    const res = await axios.put(`http://localhost:3000/api/v1/friends/removereceivedfriendrequest`,
      {
          friend: username
      },
      {
          withCredentials: true
      }
  )
  setRequestAction(prev => !prev); // Trigger re-render

  }

  const addFriend = async (username) => {
    const res = await axios.put(`http://localhost:3000/api/v1/friends/addfriend`,
      {
          friend: username
      },
      {
          withCredentials: true
      }
  )
    removeSentRequest(username)
    removeReceivedRequest(username)
    setRequestAction(prev => !prev); // Trigger re-render

  }

  if (loading) {
    return <div>Loading...</div>; // Display loading state
  }

  return (
    <>
    <p>Recieved Friend Requests</p>
      
      {user.requests.received.length > 0 ? ( user.requests.received.map((request) => 
      <div key={user.requests.received._id} className='bg-blue-50 p-2 m-1 flex justify-between'>
        <p >
          <span className='font-bold'>{request.firstName} {request.lastName}</span> sent you a friend request.
        </p>

        <div className='flex gap-1 items-center text-3xl'>
          <IoMdCheckmark className='bg-green-300 text-white rounded cursor-pointer' onClick={() => addFriend(request.userName)}/>
          <IoMdClose className='bg-red-300 text-white rounded cursor-pointer' onClick={() => removeReceivedRequest(request.userName)}/>
        </div>
      </div>
      )) : (
        <p className='bg-blue-50 p-2 m-1'>No requests recieved.</p>
      )}

    <p>Sent Friend Requests</p>
    <div className='bg-blue-50 p-2 m-1 flex justify-between'>
      
      <div className='w-full'>
      {user.requests.sent.length > 0 ? ( user.requests.sent.map((request) => 
      <div key={user.requests.sent._id}>
        <div className='flex justify-between mb-1' key={request._id}>
        <p>
          You sent a friend request to <span className='font-bold'>{request.firstName} {request.lastName}</span>.
        </p>

        <div className='flex gap-1 items-center text-3xl'>
          <IoMdClose className='bg-red-300 text-white rounded cursor-pointer' onClick={() => removeSentRequest(request.userName)}/>
      </div>
      </div>
      </div>
      )) : (
        <p>No requests sent.</p>
      )}
      </div>
    </div>
    </>
  );
};

export default RequestNotification;
