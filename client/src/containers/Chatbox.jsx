import React, { useEffect, useState, useRef } from 'react';
import { IoSend } from "react-icons/io5";
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../redux/fetchUsers';
import { set } from 'mongoose';

const Chatbox = ({ selectedChatId }) => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [newMessage, setNewMessage] = useState(false);
  const [isSocketOpen, setIsSocketOpen] = useState(false); // Track WebSocket state
  const socket = useRef(null);

  const userId = useSelector(state => state.user._id);

  // Fetch messages and setup WebSocket connection
  useEffect(() => {
    if (selectedChatId) {
      console.log('Fetching messages for chat:', selectedChatId);

      // Fetch messages for the selected chat
      axios.get(`http://localhost:3000/api/v1/chats/${selectedChatId}/messages`, { withCredentials: true })
  .then(response => {
    const messages = response.data;
    console.log('Fetched messages:', response.data);
    messages.forEach(message => {
      setMessages(prevMessages => [...prevMessages, message]);
    })
  })
  .catch(error => console.error('Error fetching messages:', error));


      // Set up WebSocket for real-time messaging
      socket.current = new WebSocket(`ws://localhost:3000`);

      socket.current.onopen = () => {
        console.log("WebSocket connection established");
        setIsSocketOpen(true);  // Mark WebSocket as open
      };

      socket.current.onmessage = (event) => {
        const newMessage = event.data;
        
        console.log('Received new message:', newMessage);
        setMessages(prevMessages => [...prevMessages, newMessage]);
        console.log('messages: ', messages);
      };

      socket.current.onclose = () => {
        console.log("WebSocket connection closed");
        setIsSocketOpen(false);  // Mark WebSocket as closed
      };

      socket.current.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      return () => {
        if (socket.current) {
          socket.current.close();
        }
      };
    }
  }, [selectedChatId, newMessage]);

  // Send message function
 // Send message function
const sendMessage = () => {
  console.log('Send button clicked');

  if (messageInput.trim()) {
      const message = { content: messageInput, senderId: userId };
      
      // Check if socket.current is not null and WebSocket is open
      if (socket.current && isSocketOpen && socket.current.readyState === WebSocket.OPEN) {
          console.log('Sending message:', message);
          socket.current.send(JSON.stringify(message));  // Send message via WebSocket
          axios.post(`http://localhost:3000/api/v1/chats/${selectedChatId}/messages`, message, { withCredentials: true })
          setNewMessage(true);
          setMessageInput('');  // Clear input field
          setNewMessage(false);

      } else {
          console.error('Cannot send message: WebSocket is not open or ready');
          console.log('WebSocket readyState:', socket.current ? socket.current.readyState : 'null');
          console.log('isSocketOpen:', isSocketOpen);
      }
  } else {
      console.error('Message input is empty');
  }
};

  

  return (
    <div className='w-2/3 bg-blue-50 p-2 flex flex-col'>
      <div className='flex-grow overflow-y-auto'>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.senderId ? `${msg.senderId.firstName} ${msg.senderId.lastName}: ` : 'Typing...'}</strong> {msg.content}
          </div>
        ))}
      </div>

      <div className='flex items-center gap-1'>
        <input 
          type="text" 
          className='bg-white rounded-sm p-2 flex-grow'
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder='Your message...'
        />
        <button 
          className='text-1xl text-white p-2 cursor-pointer bg-blue-500' 
          onClick={sendMessage}
          
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbox;
