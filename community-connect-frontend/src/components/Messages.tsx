import React, { useState, useEffect } from 'react';

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
}

interface Conversation {
  userId: string;
  userName: string;
  messages: Message[];
}

const Messages: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedUser, setSelectedUser] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Fetch conversations from the backend (mock data for now)
    const mockConversations: Conversation[] = [
      {
        userId: 'user1',
        userName: 'Alice',
        messages: [
          { id: 1, sender: 'user1', content: 'Hey!', timestamp: '2024-10-14T10:00:00Z' },
          { id: 2, sender: 'you', content: 'Hello!', timestamp: '2024-10-14T10:01:00Z' },
        ],
      },
      {
        userId: 'user2',
        userName: 'Bob',
        messages: [
          { id: 1, sender: 'user2', content: 'How are you?', timestamp: '2024-10-14T10:05:00Z' },
        ],
      },
    ];

    setConversations(mockConversations);
  }, []);

  const handleSendMessage = () => {
    if (selectedUser && newMessage) {
      const updatedConversations = conversations.map((conversation) => {
        if (conversation.userId === selectedUser.userId) {
          const newMsg: Message = {
            id: conversation.messages.length + 1,
            sender: 'you',
            content: newMessage,
            timestamp: new Date().toISOString(),
          };
          return { ...conversation, messages: [...conversation.messages, newMsg] };
        }
        return conversation;
      });

      setConversations(updatedConversations);
      setNewMessage('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg h-full flex flex-col md:flex-row p-3">
      {/* Conversations List */}
      <div className="w-full md:w-1/2 border-r border-accent-light md:pr-4 mb-4 md:mb-0">
        <h2 className="text-2xl font-bold mb-4">Conversations</h2>
        {conversations.map((conversation) => (
          <div
            key={conversation.userId}
            onClick={() => setSelectedUser(conversation)}
            className={`p-2 rounded-lg cursor-pointer hover:bg-gray-100 ${
              selectedUser?.userId === conversation.userId ? 'bg-gray-200' : ''
            }`}
          >
            <p className="font-semibold">{conversation.userName}</p>
            <p className="text-gray-600">{conversation.messages[conversation.messages.length - 1]?.content}</p>
          </div>
        ))}
      </div>

      {/* Chat Window */}
      <div className="flex-1">
        {selectedUser ? (
          <div>
            <h2 className="text-2xl font-bold mb-2">Chat with {selectedUser.userName}</h2>
            <div className="border border-gray-300 rounded-lg p-2 h-64 overflow-y-auto">
              {selectedUser.messages.map((message) => (
                <div key={message.id} className={`mb-2 ${message.sender === 'you' ? 'text-right' : 'text-left'}`}>
                  <p className={`font-medium ${message.sender === 'you' ? 'text-green-700' : 'text-gray-800'}`}>
                    {message.content}
                  </p>
                  <span className="text-sm text-gray-500">{new Date(message.timestamp).toLocaleTimeString()}</span>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="mt-4 flex">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 border border-gray-300 p-2 rounded-lg"
              />
              <button
                onClick={handleSendMessage}
                className="ml-2 bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent"
              >
                Send
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-600">Select a conversation to start chatting.</p>
        )}
      </div>
    </div>
  );
};

export default Messages;
