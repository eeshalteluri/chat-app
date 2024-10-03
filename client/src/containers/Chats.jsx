import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'

import {useSelector, useDispatch} from 'react-redux'
import { fetchUsers } from '../redux/fetchUsers'

import Search from '../components/Search'
import Chat from '../components/Chat'

const Chats = ({onSelectChat}) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const loading = useSelector(state => state.loading)
  const error = useSelector(state => state.error)


  console.log("chats user: ", user)
  

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])
  

  

  return (
    <div className='w-1/3 overflow-y-auto '>
      {user.friends &&  (user.friends.map(friend =>(
        <div key={friend.chatId._id} onClick={() => onSelectChat(friend.chatId._id)}>
          <Chat firstName={friend.friendId.firstName} lastName={friend.friendId.lastName} userName={friend.friendId.userName} lastMessage={friend.chatId.lastMessage} onClick={() => onSelectChat(friend.chatId._id)} />
        </div>
        ))
      )}

      
    </div>
  )
}

export default Chats