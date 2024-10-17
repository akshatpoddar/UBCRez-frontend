import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { useRouter } from 'next/router';

interface Message {
  _id: string;
  sender: {
    username: string;
  };
  content: string;
  timestamp: string;
}

const MessageThread: React.FC = () => {
  const router = useRouter();
  const { postId } = router.query;
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      if (!postId) return;
      try {
        const response = await api.get(`/api/messages/${postId}`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchMessages();
  }, [postId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      await api.post(`/api/messages/${postId}`, { content: newMessage });
      setNewMessage('');
      // Refresh messages after sending
      const response = await api.get(`/api/messages/${postId}`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="message-thread">
      <h3>Messages</h3>
      <div className="messages">
        {messages.map((message) => (
          <div key={message._id} className="message">
            <strong>{message.sender.username}:</strong> {message.content}
          </div>
        ))}
      </div>
      <div className="new-message">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default MessageThread;