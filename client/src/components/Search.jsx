import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import RequestFriend from '../containers/RequestFriend';

import { IoMdSearch } from "react-icons/io";

import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../redux/fetchUsers';


const Search = () => {
  const [search, setSearch] = useState('');
  const [friend, setFriend] = useState(null);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [isAlreadyFriend, setIsAlreadyFriend] = useState(false);
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [isRequestReceived, setIsRequestReceived] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch, searchAttempted]);

  const handleSearch = async (search) => {
    try{
      setIsButtonDisabled(false)
      setIsAlreadyFriend(false);
    console.log(search);
    const res = await axios.get(`http://localhost:3000/api/v1/friends/find`,
      {
        params:{
        friend: search,
        },
        withCredentials: true });
    console.log('friend details: ',res.data.data[0]);
    setFriend(res.data.data[0]);
    setSearchAttempted(true);

    //if the same user is being searched
    console.log('Search id: ', res.data.data[0]._id)
    console.log("User Id:", user._id)
    if(user._id === (res.data.data[0]._id) ){
      setIsButtonDisabled(true);
      console.log("isButtonDisabled: ", isButtonDisabled);
    }

    //checking if user has already sent a friend request
    user.requests.sent.some(request => {
      console.log(" Sent Request Id:", request._id)
      console.log("Sent User Id:", res.data.data[0]._id)

      if(request._id === (res.data.data[0]._id) )
    {
      setIsRequestSent(true);
    }
    })

    //checking if user has already received a friend request
    user.requests.received.some(request => {
      console.log("Received Request Id:", request._id)
      console.log("Receieved User Id:", res.data.data[0]._id)

      if(request._id === (res.data.data[0]._id) )
    {
      setIsRequestReceived(true);
      setIsButtonDisabled(true);
    }
    })



    //checking if user is already friend
    user.friends.some(friend => {
      console.log("(Friend) Friend Id:", friend.friendId._id)
      console.log("(Friend) User Id:", res.data.data[0]._id)

      console.log("is equal:", friend.friendId._id === (res.data.data[0]._id) )

      if(friend.friendId._id === (res.data.data[0]._id) )
    {
      setIsAlreadyFriend(true);
      setIsButtonDisabled(true);
    }
    })

    }catch(error){
    console.log("Error: ",error);
    setFriend(null);
    setSearchAttempted(true);
    }
  }

  return (
    <>
    <div className='p-3 flex items-center justify-between'>
      <input 
      type="text" 
      placeholder="Find friends by 'Username' or 'Email'"
      className='flex-auto border-2 border-blue-400 rounded-full p-1'
      onKeyDown={(e) => {
        console.log("Key pressed:", e.key);  // Log key presses
        if (e.key === 'Enter') {
          console.log("Enter pressed");
          handleSearch(search);
        }
      }}
      onChange={(e) => setSearch(e.target.value)}
      />

      <IoMdSearch 
      className='text-3xl cursor-pointer ml-3'
      onClick={() => handleSearch(search)}
      />

    </div>
    <div className='flex justify-center'>
      <p className='p-2 w-fit bg-blue-200 rounded '><span className='font-bold'>NOTE: </span>The search is case-sensitive</p>
    </div>

      { searchAttempted && friend ? (
        <RequestFriend firstName={friend.firstName} lastName={friend.lastName} username={friend.userName} isRequestSent={isRequestSent} isButtonDisabled={isButtonDisabled}/>
      ) : (searchAttempted && <div className='flex justify-center'>
        <p className='p-2 mt-2 w-fit bg-red-200 rounded '>User not found :(</p>
      </div>)}

      { isRequestReceived && <div className='flex justify-center'>
        <p className='p-2 mt-2 w-fit bg-red-200 rounded '>You already have a friend request from {friend.firstName} {friend.lastName}</p>
      </div>}
      
      { isAlreadyFriend && <div className='flex justify-center'>
        <p className='p-2 mt-2 w-fit bg-red-200 rounded '>You are already friends with {friend.firstName} {friend.lastName}</p>
      </div>}
    
      
    </>
  )
}

export default Search