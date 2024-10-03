import React, { useState } from 'react';
import Search from '../components/Search';
import Chats from '../containers/Chats';
import Chatbox from '../containers/Chatbox';
import Header from '../containers/Header';
import { IoSend } from "react-icons/io5";

const Dashboard = () => {
  const [selectedChatId, setSelectedChatId] = useState(null);

  const handleSelectChat = (chatId) => {
    setSelectedChatId(chatId);  // Set the selected chat id
    console.log('Selected chat:', chatId);
  };

  return (
    <div className='w-full px-1'>
      <Search />
      <div className='flex h-screen mt-1'>
        {/* Pass handleSelectChat to Chats */}
        <Chats onSelectChat={handleSelectChat} />

        {/* Pass selectedChatId to Chatbox */}
        <Chatbox selectedChatId={selectedChatId} />
      </div>
    </div>
  );
}

export default Dashboard;
