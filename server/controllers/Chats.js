import { User } from '../models/User.js';
import { Chat } from '../models/Chat.js';
import { Message } from '../models/Message.js';

export const userChats = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming req.user is set after authentication

    // Fetch all chats that the user is a part of
    const chats = await Chat.find({ members: userId })
                            .populate('members', 'firstName lastName userName')
                            .populate('lastMessage.messageId');

    res.status(200).json(chats);
  } catch (error) {
    console.error('Error fetching chats:', error);
    res.status(500).json({ error: 'Failed to fetch chats' });
  }
};


export const getChatMessages = async (req, res) => {
  try {
    const { chatId } = req.params;
    console.log('get chatId: ', chatId);
    
    // Fetch messages from the Message collection associated with the chatId
    const messages = await Message.find({ chatId })
                                  .populate('chatId', 'lastMessage')
                                  .populate('senderId', 'firstName lastName userName')
                                  .sort({ createdAt: 1 }); // Sort by ascending time

    console.log('getMessages: ', messages);
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
}

export const postChatMessages = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { content, senderId } = req.body;

    console.log('senderId: ', senderId);
    console.log('chatId: ', chatId);
    console.log('content: ', content);

    // Create a new message
    const newMessage = new Message({
      chatId,
      content,
      senderId
    });

    // Save the message to the database
    const savedMessage = await newMessage.save();

    console.log('savedMessage: ', savedMessage);

    // Optionally update the lastMessage in the Chat collection
    await Chat.findByIdAndUpdate(chatId, {
      lastMessage: {
        messageId: savedMessage._id,
        content: savedMessage.content,
        timestamp: savedMessage.createdAt
      }
    });

    res.status(201).json(savedMessage);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
}